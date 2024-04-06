import { AudioFixture } from '../__structures__/audio-fixture';
import { toAssertions, toAssets, toSequenceSteps } from '../__structures__/conversions';

const raw = {
  assets: [
    {
      id: '6f32a6fb-fecb-4896-ac8a-0464474ade17',
      name: 'audio-1',
      src: 'https://audio-samples.github.io/samples/mp3/ted_val/sample-1.mp3',
      duration: 5000,
    },
  ],
  sequence: [
    {
      id: '78c7a426-0e4c-40f0-b05d-6d3bd8fad1c0',
      ref: '6f32a6fb-fecb-4896-ac8a-0464474ade17',
      timestamp: 0,
      action: 'load',
    },
    {
      id: '84320e34-8b04-44e7-9433-f81835a86ab7',
      ref: '6f32a6fb-fecb-4896-ac8a-0464474ade17',
      timestamp: 0,
      action: 'play',
    },
    {
      id: '2ffb6997-778e-4e44-9e78-2fd76f7cce35',
      ref: '6f32a6fb-fecb-4896-ac8a-0464474ade17',
      timestamp: 1000,
      action: 'pause',
    },
    {
      id: 'ffc56006-4fc8-4c6a-aaba-6fdafd6333c7',
      ref: '6f32a6fb-fecb-4896-ac8a-0464474ade17',
      timestamp: 2000,
      action: 'resume',
    },
  ],
  assertions: [
    {
      id: 'e95f8e1e-f83b-42b9-9d2e-460cf06f2f0e',
      ref: '6f32a6fb-fecb-4896-ac8a-0464474ade17',
      timestamp: 0,
      event: 'loaded',
    },
    {
      id: '618a5643-31f4-45d9-8ff8-95dcc293cab5',
      ref: '6f32a6fb-fecb-4896-ac8a-0464474ade17',
      timestamp: 0,
      event: 'playing',
    },
    {
      id: '01564a8c-f951-4de3-8c03-39c5509ff390',
      ref: '6f32a6fb-fecb-4896-ac8a-0464474ade17',
      timestamp: 1000,
      event: 'paused',
    },
    {
      id: '2253cf17-f31c-4d98-81d2-6dadccae7331',
      ref: '6f32a6fb-fecb-4896-ac8a-0464474ade17',
      timestamp: 2000,
      event: 'playing',
    },
    {
      id: 'e7d9a2a8-297d-427d-a468-645e9a3192e1',
      ref: '6f32a6fb-fecb-4896-ac8a-0464474ade17',
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
