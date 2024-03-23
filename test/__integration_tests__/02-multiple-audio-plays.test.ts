import { describe, expect, test, vi, beforeAll } from 'vitest';

import { HowlerMock } from '../__mocks__/howler-mock';
import { AUDIO_FIXTURE_02 } from '../__fixtures__/02-multiple-audio-plays.fixture';
import {
  createLog,
  loadAssets,
  objWithout,
  performSequenceSteps,
  setupAuditTrail,
  startCleanSlate,
} from '../__helpers__/test-setup';

const { assertions, assets, sequence } = AUDIO_FIXTURE_02;

vi.mock('howler', () => ({ Howl: HowlerMock }));

describe('Multiple Audios Play to End', () => {
  const logs = createLog();

  beforeAll(() => {
    startCleanSlate();
    setupAuditTrail(logs);
    loadAssets(sequence, assets);
    performSequenceSteps(sequence, assets);

    vi.runAllTimers();
  });

  test('Entire End to End', () => {
    const expected = assertions.map((assertion) => objWithout(assertion, 'id'));
    const result = logs.map((log) => objWithout(log, 'name'));

    expect(result).toEqual(expected);
  });
});
