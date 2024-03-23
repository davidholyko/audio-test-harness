import { describe, expect, test, vi, beforeAll } from 'vitest';

import { HowlerMock } from '../__mocks__/howler-mock';
import { AUDIO_FIXTURE_01 } from '../__fixtures__/01-audio-plays-to-end.fixture';
import { audioPlayer } from '../../src/utils/audio-player';
import { eventDispatcher } from '../../src/utils/event-dispatcher';
import { AudioEvents } from '../../src/types/audio.types';
import { AuditLogEntry } from '../../src/types/event-dispatcher.types';
import { AudioAsset } from '../__structures__/audio-fixture.types';

const { assertions, assets } = AUDIO_FIXTURE_01;

vi.mock('howler', () => ({ Howl: HowlerMock }));

function objWithout<T extends object, K extends keyof T>(
  obj: T,
  propToRemove: K
): Omit<T, K> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [propToRemove]: _propValue, ...rest } = obj;
  return rest as Omit<T, K>;
}

const startCleanSlate = () => {
  globalThis.requestAnimationFrame = () => 0;
  globalThis.cancelAnimationFrame = () => 0;

  vi.clearAllMocks();
  vi.clearAllTimers();
  vi.useFakeTimers();

  eventDispatcher.removeAllListeners();
};

const setupAuditTrail = (logFile: AuditLogEntry[]) => {
  eventDispatcher.on(AudioEvents.loaded, (data: { log: AuditLogEntry }) => {
    logFile.push(data.log);
  });

  eventDispatcher.on(AudioEvents.playing, (data: { log: AuditLogEntry }) => {
    logFile.push(data.log);
  });

  eventDispatcher.on(AudioEvents.ended, (data: { log: AuditLogEntry }) => {
    logFile.push(data.log);
  });
};

const startLoadStep = (assets: AudioAsset[]) => {
  assets.forEach((asset) => {
    audioPlayer.load(asset.src, { testingProperties: asset });
  });
};

describe('Audio Plays to End', () => {
  const logs: AuditLogEntry[] = [];

  beforeAll(() => {
    startCleanSlate();
    setupAuditTrail(logs);
    startLoadStep(assets);

    audioPlayer.play(assets[0].src);
    vi.runAllTimers();
  });

  test('AudioPlayer loads audio', () => {
    const expected = objWithout(assertions[0], 'id');
    const result = objWithout(logs[0], 'name');

    expect(result).toEqual(expected);
  });

  test('AudioPlayer plays audio', () => {
    const expected = objWithout(assertions[1], 'id');
    const result = objWithout(logs[1], 'name');

    expect(result).toEqual(expected);
  });

  test('AudioPlayer ends audio', () => {
    const expected = objWithout(assertions[2], 'id');
    const result = objWithout(logs[2], 'name');

    expect(result).toEqual(expected);
  });

  test('Entire End to End', () => {
    logs.map((log) => objWithout(log, 'name'));

    const expected = assertions.map((assertion) => objWithout(assertion, 'id'));
    const result = logs.map((log) => objWithout(log, 'name'));

    expect(result).toEqual(expected);
  });
});
