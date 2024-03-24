import { AudioFixture } from '../__structures__/audio-fixture';
import {
  toAssertions,
  toAssets,
  toSequenceSteps,
} from '../__structures__/conversions';

const raw = {
  assets: [
    {
      id: '7d419e0f-1ab4-401c-8269-70a56d5fe0f9',
      name: 'audio-1',
      src: 'https://audio-samples.github.io/samples/mp3/ted_val/sample-1.mp3',
      duration: 5000,
    },
  ],
  sequence: [
    {
      id: 'abe8bee9-1bb4-4b6a-9ef1-7d614827d278',
      ref: '7d419e0f-1ab4-401c-8269-70a56d5fe0f9',
      timestamp: 0,
      action: 'play',
    },
    {
      id: 'd3e38a70-033e-4534-ab35-14be07550472',
      ref: '7d419e0f-1ab4-401c-8269-70a56d5fe0f9',
      timestamp: 1000,
      action: 'pause',
    },
    {
      id: 'd1c9ae5e-deb8-4c2d-b731-b3ca02476147',
      ref: '7d419e0f-1ab4-401c-8269-70a56d5fe0f9',
      timestamp: 1100,
      action: 'resume',
    },
  ],
  assertions: [
    {
      id: 'e66c799f-8f82-47c3-8e5d-af822dc7c045',
      ref: '7d419e0f-1ab4-401c-8269-70a56d5fe0f9',
      timestamp: 0,
      event: 'loaded',
    },
    {
      id: 'ad74b2ce-1734-4f34-9bb1-f245082764a1',
      ref: '7d419e0f-1ab4-401c-8269-70a56d5fe0f9',
      timestamp: 0,
      event: 'playing',
    },
    {
      id: '1fcb0a01-c261-4cd0-a89f-4f76911032df',
      ref: '7d419e0f-1ab4-401c-8269-70a56d5fe0f9',
      timestamp: 1000,
      event: 'paused',
    },
    {
      id: '1f48ecf5-3461-4bd3-8cd4-f9fa05f0be41',
      ref: '7d419e0f-1ab4-401c-8269-70a56d5fe0f9',
      timestamp: 1100,
      event: 'playing',
    },
    {
      id: '3e1bb98f-0613-42d2-b774-b7aa47897b2c',
      ref: '7d419e0f-1ab4-401c-8269-70a56d5fe0f9',
      timestamp: 5100,
      event: 'ended',
    },
  ],
};

const conversion = [
  toAssets(raw.assets),
  toSequenceSteps(raw.sequence),
  toAssertions(raw.assertions),
] as const;

const AUDIO_FIXTURE = new AudioFixture(...conversion);

export default AUDIO_FIXTURE;
