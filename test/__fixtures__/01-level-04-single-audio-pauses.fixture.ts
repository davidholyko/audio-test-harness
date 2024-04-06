import { AudioFixture } from '../__structures__/audio-fixture';
import { toAssertions, toAssets, toSequenceSteps } from '../__structures__/conversions';

const raw = {
  assets: [
    {
      id: '56276142-89d9-4f71-9eca-faeca54d3022',
      name: 'audio-1',
      src: 'https://audio-samples.github.io/samples/mp3/ted_val/sample-1.mp3',
      duration: 5000,
    },
  ],
  sequence: [
    {
      id: 'b95a5e66-2140-4612-8c2a-0581950b6731',
      ref: '56276142-89d9-4f71-9eca-faeca54d3022',
      timestamp: 0,
      action: 'load',
    },
    {
      id: '99adef51-6797-43f3-b38a-b4fe010b6703',
      ref: '56276142-89d9-4f71-9eca-faeca54d3022',
      timestamp: 0,
      action: 'play',
    },
    {
      id: 'abd940c6-337f-4ca2-b536-964b77ee70fc',
      ref: '56276142-89d9-4f71-9eca-faeca54d3022',
      timestamp: 1000,
      action: 'pause',
    },
  ],
  assertions: [
    {
      id: '439d8809-4a72-4432-ae15-49a63f542ceb',
      ref: '56276142-89d9-4f71-9eca-faeca54d3022',
      timestamp: 0,
      event: 'loaded',
    },
    {
      id: '42ab0991-3d77-400e-9d4f-2852c99f39ff',
      ref: '56276142-89d9-4f71-9eca-faeca54d3022',
      timestamp: 0,
      event: 'playing',
    },
    {
      id: '9632b02a-da62-412f-8686-3a7928fd3ab8',
      ref: '56276142-89d9-4f71-9eca-faeca54d3022',
      timestamp: 1000,
      event: 'paused',
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
