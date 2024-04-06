import {
  AudioMarkerId,
  AudioSample,
  MarkerActionNames,
  TimeInMilleseconds,
} from './types/audio.types';

/**
 * @see https://www.manythings.org/audio/sentences/1.html
 * for free audio
 */
export const AUDIO_SAMPLES: AudioSample[] = [
  {
    id: '7f6b36ce-cc5a-43db-b10f-7ad5e628f1d1',
    name: 'audio-1',
    src: 'http://study.aitech.ac.jp/tat/281047.mp3'.toSrc(),
    speech_to_text: 'The sun is up.',
    markers: [
      {
        id: 'e8607212-0e98-4182-8aa2-95161096f045' as AudioMarkerId,
        action: {
          name: MarkerActionNames.bold_all,
          args: [],
          timestamp: 0 as TimeInMilleseconds,
        },
      },
      {
        id: '0f253e4d-1a50-4c81-aa8f-1aad472b2c6b' as AudioMarkerId,
        action: {
          name: MarkerActionNames.highlight,
          args: ["#audio-1 [data-word='The']"],
          timestamp: 0 as TimeInMilleseconds,
        },
      },
      {
        id: '20dacde7-6f02-44f0-ad5b-b5f8b309d526' as AudioMarkerId,
        action: {
          name: MarkerActionNames.unhighlight,
          args: ["#audio-1 [data-word='The']"],
          timestamp: 375 as TimeInMilleseconds,
        },
      },
      {
        id: '17911e5d-abcf-4107-a7d6-1ec44f39b1b1' as AudioMarkerId,
        action: {
          name: MarkerActionNames.highlight,
          args: ["#audio-1 [data-word='sun']"],
          timestamp: 375 as TimeInMilleseconds,
        },
      },
      {
        id: '4394ed4a-c43f-497f-8af1-dcf6e5242fb6' as AudioMarkerId,
        action: {
          name: MarkerActionNames.unhighlight,
          args: ["#audio-1 [data-word='sun']"],
          timestamp: 750 as TimeInMilleseconds,
        },
      },
      {
        id: 'ae9344f6-aa1d-4a21-a76d-1de176fa181c' as AudioMarkerId,
        action: {
          name: MarkerActionNames.highlight,
          args: ["#audio-1 [data-word='is']"],
          timestamp: 750 as TimeInMilleseconds,
        },
      },
      {
        id: '86428938-f501-4d8d-91b0-6507363cb9b2' as AudioMarkerId,
        action: {
          name: MarkerActionNames.unhighlight,
          args: ["#audio-1 [data-word='is']"],
          timestamp: 1000 as TimeInMilleseconds,
        },
      },
      {
        id: '424b03db-3dab-4ce6-bcd4-b3adb9a637e2' as AudioMarkerId,
        action: {
          name: MarkerActionNames.highlight,
          args: ["#audio-1 [data-word='up.']"],
          timestamp: 1000 as TimeInMilleseconds,
        },
      },
      {
        id: '77999774-9512-42ab-8b8d-5892068a878e' as AudioMarkerId,
        action: {
          name: MarkerActionNames.unhighlight,
          args: ["#audio-1 [data-word='up.']"],
          timestamp: 1400 as TimeInMilleseconds,
        },
      },
      {
        id: '2ea58d76-0701-438e-89c6-bbab39413d83' as AudioMarkerId,
        action: {
          name: MarkerActionNames.unbold_all,
          args: [],
          timestamp: 1400 as TimeInMilleseconds,
        },
      },
    ],
  },
  {
    id: 'be39e145-cdb8-464e-9c3d-69c7b880be64',
    name: 'audio-2',
    src: ' http://study.aitech.ac.jp/tat/39214.mp3'.toSrc(),
    speech_to_text: 'Turn up the tv.',
  },
];
