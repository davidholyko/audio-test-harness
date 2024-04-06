import { AudioFixture } from '../__structures__/audio-fixture';
import { toAssertions, toAssets, toSequenceSteps } from '../__structures__/conversions';

const raw = {
  assets: [
    {
      id: '3331b0b2-3aa6-4409-b3f5-3fc06afc35d9',
      name: 'audio-1',
      src: 'https://audio-samples.github.io/samples/mp3/ted_val/sample-1.mp3',
      duration: 5000,
    },
  ],
  sequence: [
    {
      id: 'f69b3736-c55b-4bf2-b0ae-15b74fb94d84',
      ref: '3331b0b2-3aa6-4409-b3f5-3fc06afc35d9',
      timestamp: 0,
      action: 'load',
    },
    {
      id: 'bf1e4783-aca0-4682-8d9e-08d95ae7ba7f',
      ref: '3331b0b2-3aa6-4409-b3f5-3fc06afc35d9',
      timestamp: 1000,
      action: 'play',
    },
  ],
  assertions: [
    {
      id: 'fc085bf3-24dd-4980-bb52-c10f553224d5',
      ref: '3331b0b2-3aa6-4409-b3f5-3fc06afc35d9',
      timestamp: 0,
      event: 'loaded',
    },
    {
      id: 'b8919ea0-2f71-4450-82ea-71caf71cdbb9',
      ref: '3331b0b2-3aa6-4409-b3f5-3fc06afc35d9',
      timestamp: 1000,
      event: 'playing',
    },
    {
      id: '646a7897-d024-40b3-8479-72d6eda0a1e8',
      ref: '3331b0b2-3aa6-4409-b3f5-3fc06afc35d9',
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

const AUDIO_FIXTURE = new AudioFixture(...conversion);

export default AUDIO_FIXTURE;
