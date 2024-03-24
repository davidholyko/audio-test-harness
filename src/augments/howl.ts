import { AudioId, AudioSource, TimeInMilleseconds } from '../types/audio.types';

declare module 'howler' {
  export type TestPayload = {
    playOffset: TimeInMilleseconds;
    pauseOffset: TimeInMilleseconds;
  };

  export type TestProperties = {
    // for logging
    id: AudioId;
    name: string;
    duration: TimeInMilleseconds;
    src: AudioSource;

    // during playback
    playOffset: TimeInMilleseconds;
    pauseOffset: TimeInMilleseconds;
  };

  export type TestCallback = (payload: TestPayload) => void;

  export interface HowlOptions {
    testProps?: TestProperties;
  }

  export interface Howl {
    updatePlayOffset: (value: TimeInMilleseconds) => void;
    updatePauseOffset: (value: TimeInMilleseconds) => void;

    seek(): (value?: number) => TimeInMilleseconds;

    once(event: 'play', callback: TestCallback): void;
    once(event: 'pause', callback: TestCallback): void;
    once(event: 'stop', callback: TestCallback): void;
    once(event: 'resume', callback: TestCallback): void;
    once(event: 'end', callback: TestCallback): void;

    on(event: 'play', callback: TestCallback): void;
    on(event: 'pause', callback: TestCallback): void;
    on(event: 'stop', callback: TestCallback): void;
    on(event: 'resume', callback: TestCallback): void;
    on(event: 'end', callback: TestCallback): void;

    off(event: 'play', callback: TestCallback): void;
    off(event: 'pause', callback: TestCallback): void;
    off(event: 'stop', callback: TestCallback): void;
    off(event: 'resume', callback: TestCallback): void;
    off(event: 'end', callback: TestCallback): void;
  }
}
