import { AudioFixture } from '../__structures__/audio-fixture';
import {
  toAssertions,
  toAssets,
  toSequenceSteps,
} from '../__structures__/conversions';

const raw = {
  assets: [
    {
      id: '79494710-d213-46a5-815f-7a92d88a6633',
      name: 'audio-1',
      src: 'https://audio-samples.github.io/samples/mp3/ted_val/sample-1.mp3',
      duration: 5000,
    },
  ],
  sequence: [
    {
      id: '2370f0cd-80dd-4891-9d39-bc6f2ceadc48',
      ref: '79494710-d213-46a5-815f-7a92d88a6633',
      timestamp: 0,
      action: 'play',
    },
    {
      id: '2370f0cd-80dd-4891-9d39-bc6f2ceadc48',
      ref: '79494710-d213-46a5-815f-7a92d88a6633',
      timestamp: 2000,
      action: 'pause',
    },
    {
      id: 'faa98077-05d5-4fc0-9729-04374cae0ab3',
      ref: '79494710-d213-46a5-815f-7a92d88a6633',
      timestamp: 3000,
      action: 'play',
    },
  ],
  assertions: [
    {
      id: '57207c2e-ed95-4051-a52c-64a74f4403ad',
      ref: '79494710-d213-46a5-815f-7a92d88a6633',
      timestamp: 0,
      event: 'loaded',
    },
    {
      id: 'ee031514-6b6b-4311-823b-1c46bf7f46b4',
      ref: '79494710-d213-46a5-815f-7a92d88a6633',
      timestamp: 0,
      event: 'playing',
    },
    {
      id: 'efe9423e-7e5b-4ed8-99c1-8a484d489d7d',
      ref: '79494710-d213-46a5-815f-7a92d88a6633',
      timestamp: 2000,
      event: 'paused',
    },
    {
      id: '7300f5ac-7790-41db-86a3-c2f3456ac4bb',
      ref: '79494710-d213-46a5-815f-7a92d88a6633',
      timestamp: 3000,
      event: 'playing',
    },
    {
      id: '6b164251-c19a-479d-a05c-4a717981e555',
      ref: '79494710-d213-46a5-815f-7a92d88a6633',
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
