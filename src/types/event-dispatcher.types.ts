import { AudioEvents, TimeInMilleseconds, Uuid } from './audio.types';

export type AuditLogEntry = {
  ref: Uuid;
  timestamp: TimeInMilleseconds;
  event: keyof typeof AudioEvents;
  name: string;
};
