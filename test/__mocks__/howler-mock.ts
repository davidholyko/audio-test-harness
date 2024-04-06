import {
  AudioAction,
  AudioActions,
  AudioId,
  AudioSource,
  TimeInMilleseconds,
} from '../../src/types/audio.types';

import '../../src/augments';

import type { TestProperties } from 'howler';

type EventCallback = (testProps: TestProperties) => void;

type EventMap = Record<keyof typeof AudioActions, EventCallback[]>;

const INTERVAL = 50;

export class HowlerMock {
  #internalSeek: TimeInMilleseconds;

  #timerId: ReturnType<typeof setInterval>;

  #events: EventMap = {
    [AudioActions.load]: [],
    [AudioActions.play]: [],
    [AudioActions.pause]: [],
    [AudioActions.stop]: [],
    [AudioActions.resume]: [],
    [AudioActions.end]: [],
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

  on(actionType: AudioAction, callBack: () => void) {
    this.#events[actionType].push(callBack);
  }

  once(actionType: AudioAction, callBack: () => void) {
    this.#events[actionType].push(callBack);
  }

  off(actionType: AudioAction) {
    this.#events[actionType] = [];
  }

  play() {
    this.#timerId = setInterval(this.#update, INTERVAL);

    this.#events?.[AudioActions.play].forEach((callBack) => {
      callBack?.(this.#testProps);
    });

    this.#playing = true;
  }

  pause() {
    clearInterval(this.#timerId);

    this.#events?.[AudioActions.pause].forEach((callBack) => {
      callBack?.(this.#testProps);
    });

    this.#playing = false;
  }

  stop() {
    clearInterval(this.#timerId);

    this.#events?.[AudioActions.stop].forEach((callBack) => {
      callBack?.(this.#testProps);
    });

    this.#playing = false;
  }

  resume() {
    this.play();
  }

  load() {
    this.#events?.[AudioActions.load].forEach((callBack) => {
      callBack?.(this.#testProps);
    });
  }

  #end() {
    this.#events?.[AudioActions.end].forEach((callBack) => {
      callBack?.(this.#testProps);
    });

    this.#playing = false;
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

  seek(seek: TimeInMilleseconds): TimeInMilleseconds {
    if (seek === undefined) {
      return this.#internalSeek;
    }

    this.#internalSeek = seek;

    return this.#internalSeek;
  }

  duration(): TimeInMilleseconds {
    return this.#testProps.duration;
  }

  updatePauseOffset(value: TimeInMilleseconds) {
    this.#testProps.pauseOffset = value;
  }

  updatePlayOffset(value: TimeInMilleseconds) {
    this.#testProps.playOffset = value;
  }
}
