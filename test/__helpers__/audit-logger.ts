import { AuditLogEntry } from '../../src/types/event-dispatcher.types';
import { AudioAssertion } from '../__structures__/audio-fixture.types';

export function objWithout<T extends object, K extends keyof T>(
  obj: T,
  propToRemove: K
): Omit<T, K> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [propToRemove]: _propValue, ...rest } = obj;
  return rest as Omit<T, K>;
}

export class AuditLogger {
  #logs: AuditLogEntry[] = [];

  #expected: Omit<AudioAssertion, 'id'>[];

  constructor(assertions: AudioAssertion[]) {
    this.#expected = assertions.map((assertion) => objWithout(assertion, 'id'));
  }

  get expected() {
    return this.#expected;
  }

  get logs() {
    return this.#logs;
  }

  get results() {
    return this.#logs.map((log) => objWithout(log, 'name'));
  }

  appendAuditLogEntry(log: AuditLogEntry) {
    this.#logs.push(log);
  }
}
