import { AudioFixture } from '../__structures__/audio-fixture';
import {
  toAssertions,
  toAssets,
  toSequenceSteps,
} from '../__structures__/conversions';

const raw = {
  assets: [
    {
      id: '59e8edf6-4bc5-442b-90ca-52e189b98209',
      name: 'audio-1',
      src: 'https://audio-samples.github.io/samples/mp3/ted_val/sample-1.mp3',
      duration: 5000,
    },
  ],
  sequence: [
    {
      id: '99adef51-6797-43f3-b38a-b4fe010b6703',
      ref: '59e8edf6-4bc5-442b-90ca-52e189b98209',
      timestamp: 0,
      action: 'play',
    },
  ],
  assertions: [
    {
      id: '4bebc442-9168-4778-a800-5b59232e88a5',
      ref: '59e8edf6-4bc5-442b-90ca-52e189b98209',
      timestamp: 0,
      event: 'loaded',
    },
    {
      id: '8e634c62-ab14-499a-aeba-3a3c122ea0c0',
      ref: '59e8edf6-4bc5-442b-90ca-52e189b98209',
      timestamp: 0,
      event: 'playing',
    },
    {
      id: 'cd53bd01-6bc3-4eab-87e2-ce65884c23cf',
      ref: '59e8edf6-4bc5-442b-90ca-52e189b98209',
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

const AUDIO_FIXTURE = new AudioFixture(...conversion);

export default AUDIO_FIXTURE;
