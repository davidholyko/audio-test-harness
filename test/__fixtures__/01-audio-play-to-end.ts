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
      action: 'play',
    },
  ],
  assertions: [
    {
      id: '130b58f9-b051-4afc-bc68-4c3f186dc923',
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
      id: '047cf99b-354b-4ab9-82b6-54e5708aa8f6',
      ref: 'aa1c555b-1c98-4ddb-81f7-62dc173cc20c',
      timestamp: 5000,
      event: 'ended',
    },
  ],
};

const conversion = [
  toAssets(raw.assets),
  toSequenceSteps(raw.sequence),
  toAssertions(raw.assertions),
] as const;

export const audio_fixture_01 = new AudioFixture(...conversion);
