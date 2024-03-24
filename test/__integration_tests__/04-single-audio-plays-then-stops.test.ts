import { describe, expect, test, vi, beforeAll } from 'vitest';

import { HowlerMock } from '../__mocks__/howler-mock';
import { AUDIO_FIXTURE_03 } from '../__fixtures__/04-single-audio-plays-then-stops.fixture';
import { fullSetup } from '../__helpers__/test-setup';
import { AuditLogger } from '../__helpers__/audit-logger';

vi.mock('howler', () => ({ Howl: HowlerMock }));

describe('Single Audio Plays then Stops', () => {
  let auditLogger: AuditLogger;

  beforeAll(() => {
    auditLogger = fullSetup(AUDIO_FIXTURE_03);
  });

  test('Entire End to End', () => {
    const expected = auditLogger.expected;
    const results = auditLogger.results;

    expect(results).toEqual(expected);
  });
});
