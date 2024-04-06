import { Howl, HowlOptions } from 'howler';
import { eventDispatcher } from './event-dispatcher';
import {
  AudioEvents,
  AudioMarker,
  AudioSource,
  OnEventChangeFn,
  TimeInMilleseconds,
} from '../types/audio.types';
import { markerPlayer } from './marker-player';

type LoadOptions = {
  markers?: AudioMarker[];
  testProps?: HowlOptions['testProps'];
  callbacks?: {
    onEventChange?: OnEventChangeFn;
  };
};

type InternalAudioRecord = LoadOptions & {
  howl: Howl;
  status: AudioEvents[];
};

const getHowlTime = (howl: Howl) => (howl.seek() * 1000) as TimeInMilleseconds;

const getHowlDuration = (howl: Howl) => (howl.duration() * 1000) as TimeInMilleseconds;

export class AudioPlayer {
  #audios: Record<AudioSource, InternalAudioRecord> = {};

  get audios() {
    return this.#audios;
  }

  #update = (src: AudioSource, updaterId: number) => {
    const { howl, markers = [] } = this.audios[src];

    if (!howl.playing()) {
      cancelAnimationFrame(updaterId);
      return;
    }

    markerPlayer.fireMarkers(markers, getHowlTime(howl));

    // eventDispatcher.emit('UPDATE', { src, seek: this.audios[src].seek() });

    const newUpdaterId = requestAnimationFrame(() => {
      this.#update(src, newUpdaterId);
    });
  };

  load(src: AudioSource, options: LoadOptions) {
    const { testProps, callbacks, markers } = options;

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

      markerPlayer.addMarkers(markers);
    });

    howl.load();

    this.#audios[src] = {
      howl,
      testProps,
      callbacks,
      status: [],
      markers,
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
    const { howl, testProps, callbacks, markers = [] } = this.audios[src];

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

      if (howl.seek() === 0) {
        markerPlayer.resetMarkers(markers);
      }

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

      markerPlayer.fireMarkers(markers, getHowlDuration(howl));
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

      markerPlayer.fireMarkers(markers, getHowlDuration(howl));
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
