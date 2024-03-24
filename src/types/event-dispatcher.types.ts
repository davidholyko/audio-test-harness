import { AudioEvent, TimeInMilleseconds, Uuid } from './audio.types';

export type AuditLogEntry = {
  ref: Uuid;
  timestamp: TimeInMilleseconds;
  event: AudioEvent;
  name: string;
};
