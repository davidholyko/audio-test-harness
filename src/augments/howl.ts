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
    /**
     * @summary
     * delayOffset represents the time in between initial loading and playing
     * ```shell
     * # load at 0000
     * # play at 3000
     * #   the assertions should say playing at 3000
     * ````
     *
     * @param {TimeInMilleseconds} value
     * @returns {void}
     */
    updatePlayOffset: (value: TimeInMilleseconds) => void;

    /**
     * @summary
     * pauseOffset represents the time in between the last pause and play
     * ```shell
     * # audio is 5 seconds
     *
     * # play at    0000
     * # pause at   2000
     * # resume at  3000 # there are 3 seconds left
     * # end at     6000
     *
     * # 6000 comes from 5 second duration + 1 second pause duration
     * ```
     *
     * @param {TimeInMilleseconds} value
     * @returns {void}
     */
    updatePauseOffset: (value: TimeInMilleseconds) => void;

    seek(value?: number): TimeInMilleseconds;

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
