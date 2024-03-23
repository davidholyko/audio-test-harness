import { TimeInMilleseconds } from '../types/audio.types';

declare module 'howler' {
  interface HowlOptions {
    seekEndPosition: TimeInMilleseconds;
  }
}
