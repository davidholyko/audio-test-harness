import {
  AudioSource,
  AudioActions,
  AudioEvents,
  TimeInMilleseconds,
} from '../../src/types/audio.types';
import {
  AudioAssertion,
  AudioAsset,
  AudioId,
  AudioStep,
  RawAssertion,
  RawAsset,
  RawStep,
  Uuid,
} from './audio-fixture.types';

/**
 *
 * converts raw JSON into type safe objects.
 *
 * @param raws
 * @returns {AudioAsset[]} output
 */
export const toAssets = (raws: Array<RawAsset>): AudioAsset[] =>
  raws.map((raw) => ({
    id: raw.id as AudioId,
    name: raw.name as string,
    src: raw.src as AudioSource,
    duration: raw.duration as TimeInMilleseconds,
  }));

/**
 *
 * converts raw JSON into type safe objects. Throws an error if some JSON is invalid
 *
 * @param raws
 * @returns {AudioStep[]} output
 */
export const toSequenceSteps = (raws: Array<RawStep>): AudioStep[] =>
  raws.map((raw) => {
    if (!(raw.action in AudioActions)) {
      throw new Error(`id ${raw.id} has invalid action ${raw.action}`);
    }

    return {
      id: raw.id as Uuid,
      ref: raw.ref as AudioId,
      action: raw.action as keyof typeof AudioActions,
    };
  });

/**
 *
 * converts raw JSON into type safe objects. Throws an error if some JSON is invalid
 *
 * @param raws
 * @returns {AudioAssertion[]} output
 */
export const toAssertions = (raws: Array<RawAssertion>): AudioAssertion[] =>
  raws.map((raw) => {
    if (!(raw.event in AudioEvents)) {
      throw new Error(`id ${raw.id} has invalid event ${raw.event}`);
    }

    return {
      id: raw.id as Uuid,
      ref: raw.ref as AudioId,
      event: raw.event as keyof typeof AudioEvents,
      timestamp: raw.timestamp as TimeInMilleseconds,
    };
  });
