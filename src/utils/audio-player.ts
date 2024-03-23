import { Howl } from 'howler';
import { eventDispatcher } from './event-dispatcher';
import { AudioSource, OnLoadCompletedFn } from '../types/audio-types';

export class AudioPlayer {
  #audios: Record<AudioSource, Howl> = {};

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
    if (!this.audios[src].playing()) {
      cancelAnimationFrame(updaterId);
      return;
    }

    // eventDispatcher.emit('UPDATE', { src, seek: this.audios[src].seek() });

    const newUpdaterId = requestAnimationFrame(() => {
      this.#update(src, newUpdaterId);
    });
  };

  load(src: AudioSource, onLoadCompleted?: OnLoadCompletedFn) {
    const howl = new Howl({ src: [src], autoplay: false });

    howl.on('load', () => {
      eventDispatcher.emit('LOADED', { src });
      onLoadCompleted?.();
    });

    howl.load();

    this.#audios[src] = howl;
  }

  unload(src: AudioSource) {
    const howl = this.audios[src];

    howl.unload();
  }

  /**
   * Play Audio from beginning
   * @param {AudioSource} src
   */
  play(src: AudioSource) {
    const howl = this.audios[src];

    // reset all listeners
    howl.off('play');
    howl.off('pause');
    howl.off('stop');
    howl.off('end');

    howl.on('play', () => {
      eventDispatcher.emit('PLAYING', { src });

      this.#update(src, 0);
    });

    howl.once('pause', () => {
      eventDispatcher.emit('PAUSED', { src });
    });

    howl.once('stop', () => {
      eventDispatcher.emit('STOPPED', { src });
    });

    howl.once('end', () => {
      eventDispatcher.emit('ENDED', { src });
    });

    howl.seek(0);
    howl.play();
  }

  /**
   * Pause Audio at a certain point
   * @param {AudioSource} src
   */
  pause(src: AudioSource) {
    const howl = this.audios[src];

    howl.pause();
  }

  /**
   * Stop Audio which resets seek position to 0
   * @param {AudioSource} src
   */
  stop(src: AudioSource) {
    const howl = this.audios[src];

    howl.stop();
  }

  /**
   * Resume Audio at a seek position that is not 0
   * @param {AudioSource} src
   */
  resume(src: AudioSource) {
    const howl = this.audios[src];

    if (!howl.seek()) {
      return;
    }

    howl.play();
  }
}

export const audioPlayer = new AudioPlayer();
