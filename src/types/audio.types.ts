/**
 * a URL like:
 *
 * https://audio-samples.github.io/samples/mp3/blizzard_tts_unbiased/sample-6/fake-0.mp3
 */
export type AudioSource = string & { __brand: 'AudioSource' };

export type OnEventChangeFn = (event: AudioEvents) => void;

export type TimeInMilleseconds = number & { __brand: 'TimeInMilleseconds' };
export type Uuid = string & { __brand: 'Uuid' };
export type AudioId = string & { __brand: 'AudioId' };

export enum AudioActions {
  load = 'load',
  play = 'play',
  pause = 'pause',
  stop = 'stop',
  resume = 'resume',
  end = 'end',
}

export type AudioAction = keyof typeof AudioActions;

export enum AudioEvents {
  not_loaded = 'not_loaded',
  loaded = 'loaded',
  playing = 'playing',
  paused = 'paused',
  stopped = 'stopped',
  ended = 'ended',
}

export type AudioEvent = keyof typeof AudioEvents;
