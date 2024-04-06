import { AudioFixture } from '../__structures__/audio-fixture';
import { toAssertions, toAssets, toSequenceSteps } from '../__structures__/conversions';

const raw = {
  assets: [
    {
      id: 'edcc8678-7742-40c0-82aa-c1df729ca46d',
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
      id: '77c24f1f-61ef-4227-906d-52e502bea8fa',
      ref: 'edcc8678-7742-40c0-82aa-c1df729ca46d',
      timestamp: 0,
      action: 'load',
    },
    {
      id: 'aef898f4-d62a-4e7e-8b99-d3871446f5ad',
      ref: '13a70dcd-e26e-4717-8551-757e05b1ced3',
      timestamp: 0,
      action: 'load',
    },
    {
      id: '13e91628-5e14-485d-b3c2-ae23ee50e2ce',
      ref: 'edcc8678-7742-40c0-82aa-c1df729ca46d',
      timestamp: 0,
      action: 'play',
    },
    {
      id: 'e9e3b1fc-fbf6-4d2c-b686-9104b27df3c6',
      ref: '13a70dcd-e26e-4717-8551-757e05b1ced3',
      timestamp: 2000,
      action: 'play',
    },
  ],
  assertions: [
    {
      id: '4da408e0-4bcc-4dfc-8ab8-c453b254ab99',
      ref: 'edcc8678-7742-40c0-82aa-c1df729ca46d',
      timestamp: 0,
      event: 'loaded',
    },
    {
      id: 'aee1dda7-ba61-4372-898f-2217340e3ddc',
      ref: '13a70dcd-e26e-4717-8551-757e05b1ced3',
      timestamp: 0,
      event: 'loaded',
    },
    {
      id: 'ed40515d-7400-4e40-912c-8d820ae26b7e',
      ref: 'edcc8678-7742-40c0-82aa-c1df729ca46d',
      timestamp: 0,
      event: 'playing',
    },
    {
      id: 'fac35dde-c593-4111-9b5d-1285cbf3183d',
      ref: '13a70dcd-e26e-4717-8551-757e05b1ced3',
      timestamp: 2000,
      event: 'playing',
    },
    {
      id: 'f72318f6-a6bc-4722-b6fc-bcdb0680c497',
      ref: '13a70dcd-e26e-4717-8551-757e05b1ced3',
      timestamp: 4000,
      event: 'ended',
    },
    {
      id: '18334091-4624-4cb1-b8ae-cf74f3eb8d73',
      ref: 'edcc8678-7742-40c0-82aa-c1df729ca46d',
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
