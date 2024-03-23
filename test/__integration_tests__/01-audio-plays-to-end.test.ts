import { describe, expect, test, vi, beforeAll } from 'vitest';

import { HowlerMock } from '../__mocks__/howler-mock';
import { AUDIO_FIXTURE_01 } from '../__fixtures__/01-audio-plays-to-end.fixture';
import {
  createLog,
  loadAssets,
  objWithout,
  performSequenceSteps,
  setupAuditTrail,
  startCleanSlate,
} from '../__helpers__/test-setup';

const { assertions, assets, sequence } = AUDIO_FIXTURE_01;

vi.mock('howler', () => ({ Howl: HowlerMock }));

describe('Audio Plays to End', () => {
  const logs = createLog();

  beforeAll(() => {
    startCleanSlate();
    setupAuditTrail(logs);
    loadAssets(assets);
    performSequenceSteps(sequence, assets);

    vi.runAllTimers();
  });

  test('AudioPlayer loads Audio', () => {
    const expected = objWithout(assertions[0], 'id');
    const result = objWithout(logs[0], 'name');

    expect(result).toEqual(expected);
  });

  test('AudioPlayer plays Audio', () => {
    const expected = objWithout(assertions[1], 'id');
    const result = objWithout(logs[1], 'name');

    expect(result).toEqual(expected);
  });

  test('AudioPlayer ends Audio', () => {
    const expected = objWithout(assertions[2], 'id');
    const result = objWithout(logs[2], 'name');

    expect(result).toEqual(expected);
  });

  test('Entire End to End', () => {
    const expected = assertions.map((assertion) => objWithout(assertion, 'id'));
    const result = logs.map((log) => objWithout(log, 'name'));

    expect(result).toEqual(expected);
  });
});
