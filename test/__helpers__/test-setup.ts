import { vi } from 'vitest';
import {
  AudioActions,
  AudioEvents,
  TimeInMilleseconds,
} from '../../src/types/audio.types';
import { AuditLogEntry } from '../../src/types/event-dispatcher.types';
import { audioPlayer } from '../../src/utils/audio-player';
import {
  AudioAssertion,
  AudioAsset,
  AudioStep,
} from '../__structures__/audio-fixture.types';
import { eventDispatcher } from '../../src/utils/event-dispatcher';

import '../../src/augments';
import { AuditLogger } from './audit-logger';

export const INTERVAL = 50;

export const startCleanSlate = () => {
  globalThis.requestAnimationFrame = () => 0;
  globalThis.cancelAnimationFrame = () => 0;

  vi.clearAllMocks();
  vi.clearAllTimers();
  vi.useFakeTimers();

  eventDispatcher.removeAllListeners();
};

export const setupAuditTrail = (assertions: AudioAssertion[]) => {
  const logger = new AuditLogger(assertions);

  const addToLog = (data: { log: AuditLogEntry }) => {
    logger.appendAuditLogEntry(data.log);
  };

  eventDispatcher.on(AudioEvents.loaded, addToLog);
  eventDispatcher.on(AudioEvents.playing, addToLog);
  eventDispatcher.on(AudioEvents.stopped, addToLog);
  eventDispatcher.on(AudioEvents.paused, addToLog);
  eventDispatcher.on(AudioEvents.ended, addToLog);

  return logger;
};

export const loadAssets = (
  _sequenceToPlay: AudioStep[],
  assetsToLoad: AudioAsset[]
) => {
  assetsToLoad.forEach((asset) => {
    const testProps = {
      ...asset,
      playOffset: 0 as TimeInMilleseconds,
      pauseOffset: 0 as TimeInMilleseconds,
    };

    audioPlayer.load(asset.src, { testProps });
  });
};

export const performSequenceSteps = (
  sequenceToPlay: AudioStep[],
  assetsAlreadyLoaded: AudioAsset[]
) => {
  sequenceToPlay.forEach((step) => {
    const { id, timestamp, ref, action } = step;

    const referenceAsset = assetsAlreadyLoaded.find(({ id }) => id === ref);

    if (!referenceAsset) {
      throw new Error(`Step id ${id} failed. Asset for ref: ${ref} not found`);
    }

    if (action === AudioActions.play) {
      setTimeout(() => {
        audioPlayer.injectionForTesting(referenceAsset.src, (howl) => {
          // delayOffset represents the time in between initial loading and playing
          // for example:
          //   load at   0000
          //   play at   3000
          //                  the assertions should say that playing happened at 3000
          howl.updatePlayOffset(timestamp);

          // pauseOffset represents the time in between the last pause and play
          // for example:
          //   audio is 5 seconds
          //   play at   0000
          //   pause at  2000
          //   resume at 3000 // there are 3 seconds left
          //   end at    6000
          //             6000 comes from 5 second duration + 1 second pause duration

          // @ts-expect-error | About branded numbers
          howl.updatePauseOffset(timestamp - howl.seek());
        });

        audioPlayer.play(referenceAsset.src);
      }, timestamp);
    }

    if (action === AudioActions.pause) {
      setTimeout(() => {
        audioPlayer.pause(referenceAsset.src);
      }, timestamp + INTERVAL);
    }

    if (action === AudioActions.stop) {
      setTimeout(() => {
        audioPlayer.stop(referenceAsset.src);
      }, timestamp);
    }

    if (action === AudioActions.resume) {
      setTimeout(() => {
        audioPlayer.resume(referenceAsset.src);
      }, timestamp);
    }
  });
};

export function objWithout<T extends object, K extends keyof T>(
  obj: T,
  propToRemove: K
): Omit<T, K> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [propToRemove]: _propValue, ...rest } = obj;
  return rest as Omit<T, K>;
}

export function createLog() {
  const logs: AuditLogEntry[] = [];

  return logs;
}
