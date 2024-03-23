export enum AudioActions {
  play = 'play',
  pause = 'pause',
  stop = 'stop',
  resume = 'resume',
}

export enum AudioEvents {
  loaded = 'loaded',
  playing = 'playing',
  paused = 'paused',
  stopped = 'stopped',
  ended = 'ended',
}

export type Uuid = string & { __brand: 'Uuid' };
export type AudioId = string & { __brand: 'AudioId' };
export type AudioSrc = string & { __brand: 'AudioSrc' };
export type TimeInMilleseconds = number & { __brand: 'TimeInMilleseconds' };

export type AudioAsset = {
  id: AudioId;
  name: string;
  src: AudioSrc;
  duration: TimeInMilleseconds;
};

export type RawAsset = {
  id: string;
  name: string;
  src: string;
  duration: number;
};

export type AudioStep = {
  id: Uuid;
  ref: AudioId;
  action: keyof typeof AudioActions;
};

export type RawStep = {
  id: string;
  ref: string;
  action: string;
};

export type AudioAssertion = {
  id: Uuid;
  ref: AudioId;
  timestamp: TimeInMilleseconds;
  event: keyof typeof AudioEvents;
};

export type RawAssertion = {
  id: string;
  ref: string;
  timestamp: number;
  event: string;
};
