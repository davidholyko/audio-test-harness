import { AudioFixture } from '../__structures__/audio-fixture';
import { toAssertions, toAssets, toSequenceSteps } from '../__structures__/conversions';

const raw = {
  assets: [
    {
      id: 'ee9e31ea-9aa8-426d-bf8b-c4716882dcbc',
      name: 'audio-1',
      src: 'https://audio-samples.github.io/samples/mp3/ted_val/sample-1.mp3',
      duration: 5000,
    },
  ],
  sequence: [
    {
      id: '3f57d9b7-fa58-4720-aeb1-a5a206e2a9d4',
      ref: 'ee9e31ea-9aa8-426d-bf8b-c4716882dcbc',
      timestamp: 0,
      action: 'load',
    },
    {
      id: '4b41588e-534d-4122-8c1a-dcfe77d25d78',
      ref: 'ee9e31ea-9aa8-426d-bf8b-c4716882dcbc',
      timestamp: 0,
      action: 'play',
    },
    {
      id: 'db2144f7-ab53-440b-87ee-139212e0e75a',
      ref: 'ee9e31ea-9aa8-426d-bf8b-c4716882dcbc',
      timestamp: 2000,
      action: 'stop',
    },
  ],
  assertions: [
    {
      id: 'ecd39701-0fc2-496f-8a9b-a2aa7a978be9',
      ref: 'ee9e31ea-9aa8-426d-bf8b-c4716882dcbc',
      timestamp: 0,
      event: 'loaded',
    },
    {
      id: '583633d6-3eef-4fe9-b70a-845de08e9ae1',
      ref: 'ee9e31ea-9aa8-426d-bf8b-c4716882dcbc',
      timestamp: 0,
      event: 'playing',
    },
    {
      id: '914f0dec-9916-4902-b957-195df2a93506',
      ref: 'ee9e31ea-9aa8-426d-bf8b-c4716882dcbc',
      timestamp: 2000,
      event: 'stopped',
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
