import {
  AudioActions,
  AudioId,
  AudioSource,
  TimeInMilleseconds,
} from '../../src/types/audio.types';

import type { TestProperties } from 'howler';

type EventCallback = (testProps: TestProperties) => void;

type EventMap = Record<keyof typeof AudioActions, EventCallback[]>;

const INTERVAL = 50;

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

  #testProps: TestProperties = {
    pauseOffset: 0 as TimeInMilleseconds,
    playOffset: 0 as TimeInMilleseconds,
    duration: 0 as TimeInMilleseconds,
    id: 'placeholder-uuid' as AudioId,
    name: 'Placeholder Name',
    src: 'placeholder.mp4' as AudioSource,
  };

  constructor({ testProps }) {
    this.#internalSeek = 0 as TimeInMilleseconds;
    this.#testProps = {
      ...this.#testProps,
      ...testProps,
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
    this.#timerId = setInterval(this.#update, INTERVAL);

    this.#events?.play.forEach((callBack) => {
      callBack?.(this.#testProps);
    });

    this.#playing = true;
  }

  pause() {
    clearInterval(this.#timerId);

    this.#events?.pause.forEach((callBack) => {
      callBack?.(this.#testProps);
    });

    this.#playing = false;
  }

  stop() {
    clearInterval(this.#timerId);

    this.#events?.pause.forEach((callBack) => {
      callBack?.(this.#testProps);
    });

    this.#playing = false;
  }

  resume() {
    this.play();
  }

  load() {
    this.#events?.load.forEach((callBack) => {
      callBack?.(this.#testProps);
    });
  }

  #update = () => {
    const { duration } = this.#testProps;
    const position = this.#internalSeek || 0;

    this.#internalSeek = (position + INTERVAL) as TimeInMilleseconds;

    if (this.#internalSeek >= duration) {
      clearInterval(this.#timerId);
      this.#end();
    }
  };

  #end() {
    this.#events?.end.forEach((callBack) => {
      callBack?.(this.#testProps);
    });

    this.#playing = false;
  }

  seek(seek: TimeInMilleseconds) {
    if (seek === undefined) {
      return this.#internalSeek;
    }

    this.#internalSeek = seek;
  }

  updatePauseOffset(value: TimeInMilleseconds) {
    this.#testProps.pauseOffset = value;
  }

  updatePlayOffset(value: TimeInMilleseconds) {
    this.#testProps.playOffset = value;
  }
}
