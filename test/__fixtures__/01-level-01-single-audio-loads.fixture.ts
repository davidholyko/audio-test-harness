import { AudioFixture } from '../__structures__/audio-fixture';
import { toAssertions, toAssets, toSequenceSteps } from '../__structures__/conversions';

const raw = {
  assets: [
    {
      id: 'f859ffab-7634-44fc-b2c1-e30631430265',
      name: 'audio-1',
      src: 'https://audio-samples.github.io/samples/mp3/ted_val/sample-1.mp3',
      duration: 5000,
    },
  ],
  sequence: [
    {
      id: '4d9f1943-fb5d-4ddd-ae0a-bdcfd4cde9ae',
      ref: 'f859ffab-7634-44fc-b2c1-e30631430265',
      timestamp: 0,
      action: 'load',
    },
  ],
  assertions: [
    {
      id: '18da0aa7-45ad-4987-9494-a835527f2473',
      ref: 'f859ffab-7634-44fc-b2c1-e30631430265',
      timestamp: 0,
      event: 'loaded',
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
