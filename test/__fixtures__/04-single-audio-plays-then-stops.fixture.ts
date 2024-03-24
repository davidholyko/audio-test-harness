import { AudioFixture } from '../__structures__/audio-fixture';
import {
  toAssertions,
  toAssets,
  toSequenceSteps,
} from '../__structures__/conversions';

const raw = {
  assets: [
    {
      id: 'aa1c555b-1c98-4ddb-81f7-62dc173cc20c',
      name: 'audio-1',
      src: 'https://audio-samples.github.io/samples/mp3/ted_val/sample-1.mp3',
      duration: 5000,
    },
  ],
  sequence: [
    {
      id: '99adef51-6797-43f3-b38a-b4fe010b6703',
      ref: 'aa1c555b-1c98-4ddb-81f7-62dc173cc20c',
      timestamp: 0,
      action: 'play',
    },
    {
      id: '26443950-d6d4-4807-b97b-597e4fe61ec8',
      ref: 'aa1c555b-1c98-4ddb-81f7-62dc173cc20c',
      timestamp: 1000,
      action: 'stop',
    },
  ],
  assertions: [
    {
      id: 'ccc8ef34-66fe-49df-91b3-6026fb21f569',
      ref: 'aa1c555b-1c98-4ddb-81f7-62dc173cc20c',
      timestamp: 0,
      event: 'loaded',
    },
    {
      id: '047cf99b-354b-4ab9-82b6-54e5708aa8f6',
      ref: 'aa1c555b-1c98-4ddb-81f7-62dc173cc20c',
      timestamp: 0,
      event: 'playing',
    },
    {
      id: 'b3322ea6-21d0-48cd-b34d-4c67b67005ea',
      ref: 'aa1c555b-1c98-4ddb-81f7-62dc173cc20c',
      timestamp: 1000,
      event: 'stopped',
    },
  ],
};

const conversion = [
  toAssets(raw.assets),
  toSequenceSteps(raw.sequence),
  toAssertions(raw.assertions),
] as const;

export const AUDIO_FIXTURE_03 = new AudioFixture(...conversion);
