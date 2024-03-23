/**
 * a URL like:
 *
 * https://audio-samples.github.io/samples/mp3/blizzard_tts_unbiased/sample-6/fake-0.mp3
 */
export type AudioSource = string & { __brand: 'AudioSource' };

export type OnLoadCompletedFn = () => void;

export type TimeInMilleseconds = number & { __brand: 'TimeInMilleseconds' };

export enum AudioActions {
  load = 'load',
  play = 'play',
  pause = 'pause',
  stop = 'stop',
  resume = 'resume',
  end = 'end',
}

export enum AudioEvents {
  loaded = 'loaded',
  playing = 'playing',
  paused = 'paused',
  stopped = 'stopped',
  ended = 'ended',
}
