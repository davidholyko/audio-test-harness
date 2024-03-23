import { AudioActions, TimeInMilleseconds } from '../../src/types/audio.types';

type EventCallback = () => void;

type EventMap = Record<keyof typeof AudioActions, EventCallback[]>;

export class HowlerMock {
  #internalSeek: TimeInMilleseconds;

  #timerId: ReturnType<typeof setInterval>;

  #events: EventMap = {
    load: [],
    play: [],
    pause: [],
    stop: [],
    resume: [],
    end: [],
  };

  #playing: boolean;

  #testingProperties = {
    duration: 0,
    id: 'placeholder-uuid',
    name: 'Placeholder Name',
    src: 'placeholder.mp4',
  };

  constructor({ testingProperties }) {
    this.#internalSeek = 0 as TimeInMilleseconds;
    this.#testingProperties = {
      ...this.#testingProperties,
      ...testingProperties,
    };
  }

  playing() {
    return this.#playing;
  }

  on(actionType: keyof typeof AudioActions, callBack: () => void) {
    this.#events[actionType].push(callBack);
  }

  once(actionType: keyof typeof AudioActions, callBack: () => void) {
    this.#events[actionType].push(callBack);
  }

  off(actionType: keyof typeof AudioActions) {
    this.#events[actionType] = [];
  }

  play() {
    this.#timerId = setInterval(this.#update, 50);

    this.#events?.play.forEach((callBack) => {
      callBack?.();
    });

    this.#playing = true;
  }

  pause() {
    clearInterval(this.#timerId);

    this.#events?.pause.forEach((callBack) => {
      callBack?.();
    });

    this.#playing = false;
  }

  stop() {
    clearInterval(this.#timerId);

    this.#events?.pause.forEach((callBack) => {
      callBack?.();
    });

    this.#playing = false;
  }

  resume() {
    this.play();
  }

  load() {
    this.#events?.load.forEach((callBack) => {
      callBack?.();
    });
  }

  #update = () => {
    const { duration } = this.#testingProperties;

    const position = this.#internalSeek || 0;

    this.#internalSeek = (position + 50) as TimeInMilleseconds;

    if (this.#internalSeek >= duration) {
      clearInterval(this.#timerId);
      this.#end();
    }
  };

  #end() {
    this.#events?.end.forEach((callBack) => {
      callBack?.();
    });

    this.#playing = false;
  }

  seek(seek: TimeInMilleseconds) {
    if (seek === undefined) {
      return this.#internalSeek;
    }

    this.#internalSeek = seek;
  }
}
