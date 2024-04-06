import {
  AudioAction,
  AudioEvent,
  AudioId,
  AudioSource,
  TimeInMilleseconds,
  Uuid,
} from '../../src/types/audio.types';

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
  timestamp: TimeInMilleseconds;
  action: AudioAction;
};

export type RawStep = {
  id: string;
  ref: string;
  timestamp: number;
  action: string;
};

export type AudioAssertion = {
  id: Uuid;
  ref: AudioId;
  timestamp: TimeInMilleseconds;
  event: AudioEvent;
};

export type RawAssertion = {
  id: string;
  ref: string;
  timestamp: number;
  event: string;
};
