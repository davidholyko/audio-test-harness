import { Howl, HowlOptions } from 'howler';
import { eventDispatcher } from './event-dispatcher';
import {
  AudioEvents,
  AudioSource,
  OnEventChangeFn,
} from '../types/audio.types';

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

type AudioControls = {
  play: () => void;
  pause: () => void;
  stop: () => void;
  resume: () => void;
};

type AudioControlState = {
  isResumable: boolean;
  isStoppable: boolean;
  isPausable: boolean;
  isPlayable: boolean;
};

const DEFAULT_CONTROL_STATE: AudioControlState = {
  isResumable: false,
  isStoppable: false,
  isPausable: false,
  isPlayable: false,
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

  getStatus(src: AudioSource) {
    const record = this.audios[src];

    if (!record) {
      return undefined;
    }

    const { status } = record;
    return status[status.length - 1];
  }

  setStatus(src: AudioSource, status: AudioEvents) {
    this.audios[src]?.status.push(status);
  }

  getAudioControls = (src: AudioSource): AudioControls => {
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

  getAudioControlState = (src: AudioSource): AudioControlState => {
    const record = this.#audios[src];

    if (!record) {
      return DEFAULT_CONTROL_STATE;
    }

    const { howl } = record;

    const isResumable = this.getStatus(src) === AudioEvents.paused;
    const isStoppable = this.getStatus(src) === AudioEvents.playing;
    const isPausable = this.getStatus(src) === AudioEvents.playing;

    /**
     * Audio is playable if
     *   * it has not started or ended
     *   * it is not currently playing
     */
    const isPlayable = howl.playing()
      ? false
      : this.getStatus(src) === AudioEvents.ended || howl.seek() === 0;

    return {
      isResumable,
      isStoppable,
      isPausable,
      isPlayable,
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
    const { testProps, callbacks } = options;

    const howl = new Howl({
      src: [src],
      preload: false,
      testProps,
      html5: true,
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
      this.setStatus(src, AudioEvents.loaded);
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
      throw new Error(`Audio ${src} must be loaded manually`);
    }

    // reset all listeners
    howl.off('play');
    howl.off('pause');
    howl.off('stop');
    howl.off('end');

    howl.on('play', (payload) => {
      this.setStatus(src, AudioEvents.playing);
      callbacks?.onEventChange?.(AudioEvents.playing);

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

    howl.on('pause', () => {
      this.setStatus(src, AudioEvents.paused);
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
      this.setStatus(src, AudioEvents.stopped);
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
      this.setStatus(src, AudioEvents.ended);
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
