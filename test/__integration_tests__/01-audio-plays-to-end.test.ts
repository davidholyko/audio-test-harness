import { describe, expect, test, vi, beforeAll } from 'vitest';

import { HowlerMock } from '../__mocks__/howler-mock';
import { AUDIO_FIXTURE_01 } from '../__fixtures__/01-audio-plays-to-end.fixture';
import {
  loadAssets,
  performSequenceSteps,
  setupAuditTrail,
  startCleanSlate,
} from '../__helpers__/test-setup';
import { AuditLogger } from '../__helpers__/audit-logger';

const { assertions, assets, sequence } = AUDIO_FIXTURE_01;

vi.mock('howler', () => ({ Howl: HowlerMock }));

describe('Audio Plays to End', () => {
  let auditLogger: AuditLogger;

  beforeAll(() => {
    startCleanSlate();
    auditLogger = setupAuditTrail(assertions);
    loadAssets(sequence, assets);
    performSequenceSteps(sequence, assets);

    vi.runAllTimers();
  });

  test('Entire End to End', () => {
    const expected = auditLogger.expected;
    const results = auditLogger.results;

    expect(results).toEqual(expected);
  });
});
