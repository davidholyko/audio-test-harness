import {
  AudioActions,
  AudioEvents,
  AudioSource,
  TimeInMilleseconds,
} from '../../src/types/audio.types';

export type Uuid = string & { __brand: 'Uuid' };
export type AudioId = string & { __brand: 'AudioId' };

export type AudioAsset = {
  id: AudioId;
  name: string;
  src: AudioSource;
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
