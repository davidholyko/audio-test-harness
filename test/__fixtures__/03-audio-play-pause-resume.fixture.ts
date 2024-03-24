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
      timestamp: 2000,
      action: 'pause',
    },
    {
      id: '8de0fb15-9cab-4ff1-b673-e2cb114d4aca',
      ref: 'aa1c555b-1c98-4ddb-81f7-62dc173cc20c',
      timestamp: 3000,
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
      id: '047cf99b-354b-4ab9-82b6-54e5708aa8f6',
      ref: 'aa1c555b-1c98-4ddb-81f7-62dc173cc20c',
      timestamp: 0,
      event: 'playing',
    },
    {
      id: 'b3322ea6-21d0-48cd-b34d-4c67b67005ea',
      ref: 'aa1c555b-1c98-4ddb-81f7-62dc173cc20c',
      timestamp: 2000,
      event: 'paused',
    },
    {
      id: '9636a36f-f00a-4bae-aef8-469c34a345a1',
      ref: 'aa1c555b-1c98-4ddb-81f7-62dc173cc20c',
      timestamp: 3000,
      event: 'playing',
    },
    {
      id: '3cf34e15-7ef0-4397-b7fb-e18d8b6fb01b',
      ref: 'aa1c555b-1c98-4ddb-81f7-62dc173cc20c',
      timestamp: 6000,
      event: 'ended',
    },
  ],
};

const conversion = [
  toAssets(raw.assets),
  toSequenceSteps(raw.sequence),
  toAssertions(raw.assertions),
] as const;

export const AUDIO_FIXTURE_03 = new AudioFixture(...conversion);
