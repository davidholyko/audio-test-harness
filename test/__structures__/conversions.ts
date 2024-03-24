import {
  AudioSource,
  AudioActions,
  AudioEvents,
  TimeInMilleseconds,
  Uuid,
  AudioId,
} from '../../src/types/audio.types';
import {
  AudioAssertion,
  AudioAsset,
  AudioStep,
  RawAssertion,
  RawAsset,
  RawStep,
} from './audio-fixture.types';

const RawStepKeys = ['id', 'ref', 'timestamp', 'action'].toString();
const RawEventKeys = ['id', 'ref', 'timestamp', 'event'].toString();

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

    if (Object.keys(raw).toString() !== RawStepKeys) {
      throw new Error(`id ${raw.id} has invalid order or missing keys`);
    }

    return {
      id: raw.id as Uuid,
      ref: raw.ref as AudioId,
      timestamp: raw.timestamp as TimeInMilleseconds,
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
      throw new Error(`id ${raw.id} has invalid event '${raw.event}'`);
    }

    if (Object.keys(raw).toString() !== RawEventKeys) {
      throw new Error(`id ${raw.id} has invalid order or missing keys`);
    }

    return {
      id: raw.id as Uuid,
      ref: raw.ref as AudioId,
      timestamp: raw.timestamp as TimeInMilleseconds,
      event: raw.event as keyof typeof AudioEvents,
    };
  });
