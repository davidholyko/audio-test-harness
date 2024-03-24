import { describe, expect, test, vi, beforeAll } from 'vitest';

import { HowlerMock } from '../__mocks__/howler-mock';
import { AUDIO_FIXTURE_03 } from '../__fixtures__/03-audio-play-pause-resume.fixture.ts';
import {
  createLog,
  loadAssets,
  objWithout,
  performSequenceSteps,
  setupAuditTrail,
  startCleanSlate,
} from '../__helpers__/test-setup';

const { assertions, assets, sequence } = AUDIO_FIXTURE_03;

vi.mock('howler', () => ({ Howl: HowlerMock }));

describe('Audios Plays, Pauses, Resumes then Ends', () => {
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
