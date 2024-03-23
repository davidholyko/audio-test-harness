import { AudioSource, TimeInMilleseconds, Uuid } from '../types/audio.types';

declare module 'howler' {
  export interface HowlOptions {
    testingProperties?: {
      id: Uuid;
      name: string;
      duration: TimeInMilleseconds;
      src: AudioSource;
    };
  }
}
