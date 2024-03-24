import { describe, expect, test, vi, beforeAll } from 'vitest';

import { HowlerMock } from '../__mocks__/howler-mock';
import { AUDIO_FIXTURE_03 } from '../__fixtures__/03-single-audio-play-pause-resume.fixture';
import { fullSetup } from '../__helpers__/test-setup';
import { AuditLogger } from '../__helpers__/audit-logger';

vi.mock('howler', () => ({ Howl: HowlerMock }));

describe('Single Audio Plays, Pauses, Resumes to End', () => {
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
