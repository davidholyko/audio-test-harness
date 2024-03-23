import { describe, expect, test, vi, beforeAll } from 'vitest';

import { HowlerMock } from '../__mocks__/howler-mock';
import { AUDIO_FIXTURE_01 } from '../__fixtures__/01-audio-plays-to-end.fixture';
import { audioPlayer } from '../../src/utils/audio-player';
import { eventDispatcher } from '../../src/utils/event-dispatcher';
import { AudioEvents } from '../../src/types/audio.types';
import { AudioAsset } from '../__structures__/audio-fixture.types';

vi.mock('howler', () => ({ Howl: HowlerMock }));

const startCleanSlate = () => {
  globalThis.requestAnimationFrame = () => 0;
  globalThis.cancelAnimationFrame = () => 0;

  vi.clearAllMocks();
  vi.clearAllTimers();
  vi.useFakeTimers();

  eventDispatcher.removeAllListeners();
};

const setupAuditTrail = (logFile: string[]) => {
  eventDispatcher.on(AudioEvents.playing, () => {
    logFile.push(AudioEvents.playing);
  });

  eventDispatcher.on(AudioEvents.ended, () => {
    logFile.push(AudioEvents.ended);
  });
};

const startLoadStep = (assets: AudioAsset[]) => {
  assets.forEach((asset) => {
    const { src, duration } = asset;

    audioPlayer.load(src, { seekEndPosition: duration });
  });
};

describe('Audio Plays to End', () => {
  const logs: string[] = [];

  beforeAll(() => {
    startCleanSlate();
    setupAuditTrail(logs);

    startLoadStep(AUDIO_FIXTURE_01.assets);

    audioPlayer.play(AUDIO_FIXTURE_01.assets[0].src);

    vi.runAllTimers();

    // vi.advanceTimersByTime(AUDIO_FIXTURE_01.assets[0].duration);
  });

  test('AudioPlayer plays audio', () => {
    expect(logs).toContain(AudioEvents.playing);
  });

  test('AudioPlayer ends audio', () => {
    expect(logs).toContain(AudioEvents.ended);
  });
});
