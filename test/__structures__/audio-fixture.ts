import { AudioAssertion, AudioAsset, AudioStep } from './audio-fixture.types';

import './augments/array';

export class AudioFixture {
  #assets: AudioAsset[];

  #sequence: AudioStep[];

  #assertions: AudioAssertion[];

  constructor(
    assets: AudioAsset[],
    sequence: AudioStep[],
    assertions: AudioAssertion[]
  ) {
    this.#assets = assets;
    this.#sequence = sequence;
    this.#assertions = assertions;
  }

  get assets() {
    return this.#assets;
  }

  get sequence() {
    return this.#sequence;
  }

  get assertions() {
    return this.#assertions;
  }
}
