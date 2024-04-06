import { Howl, HowlOptions } from 'howler';
import { eventDispatcher } from './event-dispatcher';
import { AudioEvents, AudioSource, OnEventChangeFn } from '../types/audio.types';

type LoadOptions = {
  testProps?: HowlOptions['testProps'];
  callbacks?: {
    onEventChange?: OnEventChangeFn;
  };
};

type InternalAudioRecord = LoadOptions & {
  howl: Howl;
  status: AudioEvents[];
};

export class AudioPlayer {
  #audios: Record<AudioSource, InternalAudioRecord> = {};

  get audios() {
    return this.#audios;
  }

  getHistory(src: AudioSource) {
    const record = this.audios[src];

    if (!record) {
      return [];
    }

    return [...this.audios[src].status];
  }

  #update = (src: AudioSource, updaterId: number) => {
    const { howl } = this.audios[src];

    if (!howl.playing()) {
      cancelAnimationFrame(updaterId);
      return;
    }

    // eventDispatcher.emit('UPDATE', { src, seek: this.audios[src].seek() });

    const newUpdaterId = requestAnimationFrame(() => {
      this.#update(src, newUpdaterId);
    });
  };

  load(src: AudioSource, options: LoadOptions) {
    const { testProps, callbacks } = options;

    const howl = new Howl({
      src: [src],
      html5: true,
      preload: false,
      testProps,
    });

    howl.on('load', () => {
      eventDispatcher.emit(AudioEvents.loaded, {
        log: {
          name: testProps?.name,
          ref: testProps?.id,
          timestamp: 0,
          event: AudioEvents.loaded,
        },
      });

      callbacks?.onEventChange?.(AudioEvents.loaded);
    });

    howl.load();

    this.#audios[src] = {
      howl,
      testProps,
      callbacks,
      status: [],
    };
  }

  unload(src: AudioSource) {
    const { howl } = this.audios[src];

    howl.unload();
  }

  /**
   * Play Audio from beginning
   * @param {AudioSource} src
   */
  play(src: AudioSource) {
    const { howl, testProps, callbacks } = this.audios[src];

    if (!howl) {
      throw new Error(`Audio ${src} must be Loaded manually`);
    }

    // reset all listeners
    howl.off('play');
    howl.off('pause');
    howl.off('stop');
    howl.off('end');

    howl.on('play', (payload) => {
      callbacks?.onEventChange?.(AudioEvents.playing);

      eventDispatcher.emit(AudioEvents.playing, {
        log: {
          name: testProps?.name,
          ref: testProps?.id,
          timestamp: payload?.playOffset || howl.seek(),
          event: AudioEvents.playing,
        },
      });

      this.#update(src, 0);
    });

    howl.on('pause', () => {
      callbacks?.onEventChange?.(AudioEvents.paused);

      eventDispatcher.emit(AudioEvents.paused, {
        log: {
          name: testProps?.name,
          ref: testProps?.id,
          timestamp: howl.seek() || 0,
          event: AudioEvents.paused,
        },
      });
    });

    howl.on('stop', () => {
      callbacks?.onEventChange?.(AudioEvents.stopped);

      eventDispatcher.emit(AudioEvents.stopped, {
        log: {
          name: testProps?.name,
          ref: testProps?.id,
          timestamp: howl.seek() || 0,
          event: AudioEvents.stopped,
        },
      });
    });

    howl.on('end', (payload) => {
      callbacks?.onEventChange?.(AudioEvents.ended);

      eventDispatcher.emit(AudioEvents.ended, {
        log: {
          name: testProps?.name,
          ref: testProps?.id,
          timestamp: payload?.pauseOffset + howl.seek(),
          event: AudioEvents.ended,
        },
      });
    });

    howl.seek(0);
    howl.play();
  }

  /**
   * Pause Audio at a certain point
   * @param {AudioSource} src
   */
  pause(src: AudioSource) {
    const { howl } = this.audios[src];

    howl.pause();
  }

  /**
   * Stop Audio which resets seek position to 0
   * @param {AudioSource} src
   */
  stop(src: AudioSource) {
    const { howl } = this.audios[src];

    howl.stop();
  }

  /**
   * Resume Audio at a seek position that is not 0
   * @param {AudioSource} src
   */
  resume(src: AudioSource) {
    const { howl } = this.audios[src];

    if (!howl.seek()) {
      return;
    }

    howl.play();
  }

  /**
   * Mutate an instance of HowlerMock objects properties
   *
   * @param {AudioSource} src
   * @param {Function} callback
   */
  injectionForTesting(src: AudioSource, callback: (howl: Howl) => void) {
    const { howl } = this.#audios[src];

    callback(howl);
  }
}

export const audioPlayer = new AudioPlayer();
