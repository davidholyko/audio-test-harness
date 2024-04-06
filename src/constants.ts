import { AudioSource } from './types/audio.types';

export type AudioSample = {
  id: string;
  name: string;
  src: AudioSource;
  speech_to_text: string;
};

/**
 * @see https://www.manythings.org/audio/sentences/1.html
 * for free audio
 */
export const AUDIO_SAMPLES: AudioSample[] = [
  {
    id: '1',
    name: 'Audio 1',
    src: 'http://study.aitech.ac.jp/tat/281047.mp3'.toSrc(),
    speech_to_text: 'The sun is up.',
  },
  {
    id: '2',
    name: 'Audio 2',
    src: ' http://study.aitech.ac.jp/tat/39214.mp3'.toSrc(),
    speech_to_text: 'Turn up the tv.',
  },
];
