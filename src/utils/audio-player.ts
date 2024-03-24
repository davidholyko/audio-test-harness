import { Howl, HowlOptions } from 'howler';
import { eventDispatcher } from './event-dispatcher';
import {
  AudioEvents,
  AudioSource,
  OnLoadCompletedFn,
} from '../types/audio.types';

type LoadOptions = {
  onLoadCompleted?: OnLoadCompletedFn;
  testProps?: HowlOptions['testProps'];
};

type InternalAudio = {
  howl: Howl;
  testProps?: HowlOptions['testProps'];
};

export class AudioPlayer {
  #audios: Record<AudioSource, InternalAudio> = {};

  get audios() {
    return this.#audios;
  }

  getAudio = (src: AudioSource) => {
    const play = () => this.play(src);
    const pause = () => this.pause(src);
    const stop = () => this.stop(src);
    const resume = () => this.resume(src);

    return {
      play,
      pause,
      stop,
      resume,
    };
  };

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
    const { onLoadCompleted, testProps } = options;

    const howl = new Howl({
      src: [src],
      autoplay: false,
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
      onLoadCompleted?.();
    });

    howl.load();

    this.#audios[src] = { howl, testProps };
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
    const { howl, testProps } = this.audios[src];

    if (!howl) {
      throw new Error(`Audio ${src} must be loaded manually`);
    }

    // reset all listeners
    howl.off('play');
    howl.off('pause');
    howl.off('stop');
    howl.off('end');

    howl.on('play', (payload) => {
      eventDispatcher.emit(AudioEvents.playing, {
        log: {
          name: testProps?.name,
          ref: testProps?.id,
          timestamp: payload?.playOffset,
          event: AudioEvents.playing,
        },
      });

      this.#update(src, 0);
    });

    howl.once('pause', () => {
      eventDispatcher.emit(AudioEvents.paused, {
        log: {
          name: testProps?.name,
          ref: testProps?.id,
          timestamp: howl.seek() || 0,
          event: AudioEvents.paused,
        },
      });
    });

    howl.once('stop', () => {
      eventDispatcher.emit(AudioEvents.stopped, {
        log: {
          name: testProps?.name,
          ref: testProps?.id,
          timestamp: howl.seek() || 0,
          event: AudioEvents.stopped,
        },
      });
    });

    howl.once('end', (payload) => {
      eventDispatcher.emit(AudioEvents.ended, {
        log: {
          name: testProps?.name,
          ref: testProps?.id,
          // @ts-expect-error | About branded numbers
          timestamp: payload?.pauseOffset + howl.seek() || 0,
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
