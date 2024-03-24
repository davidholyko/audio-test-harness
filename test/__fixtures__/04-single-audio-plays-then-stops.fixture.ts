import { AudioFixture } from '../__structures__/audio-fixture';
import {
  toAssertions,
  toAssets,
  toSequenceSteps,
} from '../__structures__/conversions';

const raw = {
  assets: [
    {
      id: '75cc9e29-3731-4c08-bbb0-a8325b7d5e27',
      name: 'audio-1',
      src: 'https://audio-samples.github.io/samples/mp3/ted_val/sample-1.mp3',
      duration: 5000,
    },
  ],
  sequence: [
    {
      id: 'a3fe8015-4372-467a-93df-43abfa245bd5',
      ref: '75cc9e29-3731-4c08-bbb0-a8325b7d5e27',
      timestamp: 0,
      action: 'play',
    },
    {
      id: '981989e4-bf60-4516-a4a0-50c6b40bd437',
      ref: '75cc9e29-3731-4c08-bbb0-a8325b7d5e27',
      timestamp: 1000,
      action: 'stop',
    },
  ],
  assertions: [
    {
      id: '76910eed-6f26-4dac-a1b5-07c302d061aa',
      ref: '75cc9e29-3731-4c08-bbb0-a8325b7d5e27',
      timestamp: 0,
      event: 'loaded',
    },
    {
      id: '52e2f70b-8b52-44e3-9c6c-f6da3832ede1',
      ref: '75cc9e29-3731-4c08-bbb0-a8325b7d5e27',
      timestamp: 0,
      event: 'playing',
    },
    {
      id: 'a5d9574d-8569-4755-80f8-69e05851e3b7',
      ref: '75cc9e29-3731-4c08-bbb0-a8325b7d5e27',
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
