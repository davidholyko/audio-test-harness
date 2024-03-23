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
    {
      id: '13a70dcd-e26e-4717-8551-757e05b1ced3',
      name: 'audio-2',
      src: 'https://audio-samples.github.io/samples/mp3/blizzard_tts_primed/prime/sample-2.mp3',
      duration: 2000,
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
      id: '3474d734-bf4b-4ec0-bc12-4ff3cd873856',
      ref: '13a70dcd-e26e-4717-8551-757e05b1ced3',
      timestamp: 2000,
      action: 'play',
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
      id: '446af7da-5660-415d-99d7-b3c0c6baeeb6',
      ref: '13a70dcd-e26e-4717-8551-757e05b1ced3',
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
      id: '86f5b391-efb6-4990-b1d9-f88db7bb58ff',
      ref: '13a70dcd-e26e-4717-8551-757e05b1ced3',
      timestamp: 2000,
      event: 'playing',
    },
    {
      id: '5df4dce0-d7b7-4602-9d67-5cb2022a21b5',
      ref: '13a70dcd-e26e-4717-8551-757e05b1ced3',
      timestamp: 4000,
      event: 'ended',
    },
    {
      id: '3cf34e15-7ef0-4397-b7fb-e18d8b6fb01b',
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

export const AUDIO_FIXTURE_02 = new AudioFixture(...conversion);
