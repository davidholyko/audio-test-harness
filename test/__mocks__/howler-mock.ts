import { AudioActions, TimeInMilleseconds } from '../../src/types/audio.types';

type EventCallback = () => void;

type EventMap = Record<keyof typeof AudioActions, EventCallback[]>;

export class HowlerMock {
  #seekEndPosition: TimeInMilleseconds;

  #seekPosition: TimeInMilleseconds = 0 as TimeInMilleseconds;

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

  constructor({ seekEndPosition }) {
    this.#seekEndPosition = seekEndPosition;
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
    this.#seekPosition = (this.#seekPosition + 50) as TimeInMilleseconds;

    if (this.#seekPosition >= this.#seekEndPosition) {
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

  seek(seekPosition: TimeInMilleseconds) {
    this.#seekPosition = seekPosition;
  }
}
