import { AudioSource } from '../types/audio.types';

declare global {
  interface String {
    toSrc(): AudioSource;
  }
}

String.prototype.toSrc = function () {
  return this as AudioSource;
};

export {};
