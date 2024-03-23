import { vi } from 'vitest';
import { AudioActions, AudioEvents } from '../../src/types/audio.types';
import { AuditLogEntry } from '../../src/types/event-dispatcher.types';
import { audioPlayer } from '../../src/utils/audio-player';
import { AudioAsset, AudioStep } from '../__structures__/audio-fixture.types';
import { eventDispatcher } from '../../src/utils/event-dispatcher';

export const startCleanSlate = () => {
  globalThis.requestAnimationFrame = () => 0;
  globalThis.cancelAnimationFrame = () => 0;

  vi.clearAllMocks();
  vi.clearAllTimers();
  vi.useFakeTimers();

  eventDispatcher.removeAllListeners();
};

export const setupAuditTrail = (logFile: AuditLogEntry[]) => {
  const addToLog = (data: { log: AuditLogEntry }) => {
    logFile.push(data.log);
  };

  eventDispatcher.on(AudioEvents.loaded, addToLog);
  eventDispatcher.on(AudioEvents.playing, addToLog);
  eventDispatcher.on(AudioEvents.stopped, addToLog);
  eventDispatcher.on(AudioEvents.paused, addToLog);
  eventDispatcher.on(AudioEvents.ended, addToLog);
};

export const loadAssets = (
  sequenceToPlay: AudioStep[],
  assetsToLoad: AudioAsset[]
) => {
  assetsToLoad.forEach((asset) => {
    const testingProperties = {
      ...asset,
      delay: sequenceToPlay.find((step) => step.ref === asset.id)?.timestamp,
    };
    audioPlayer.load(asset.src, { testingProperties });
  });
};

export const performSequenceSteps = (
  sequenceToPlay: AudioStep[],
  assetsAlreadyLoaded: AudioAsset[]
) => {
  sequenceToPlay.forEach((step) => {
    if (step.action === AudioActions.play) {
      const referenceAsset = assetsAlreadyLoaded.find(
        ({ id }) => id === step.ref
      );

      if (!referenceAsset) {
        throw new Error(`Asset for ref: ${step.ref} not found`);
      }

      setTimeout(() => {
        audioPlayer.play(referenceAsset.src);
      }, step.timestamp);
    }

    if (step.action === AudioActions.pause) {
      const referenceAsset = assetsAlreadyLoaded.find(
        ({ id }) => id === step.ref
      );

      if (!referenceAsset) {
        throw new Error(`Asset for ref: ${step.ref} not found`);
      }

      setTimeout(() => {
        audioPlayer.pause(referenceAsset.src);
      }, step.timestamp);
    }

    if (step.action === AudioActions.stop) {
      const referenceAsset = assetsAlreadyLoaded.find(
        ({ id }) => id === step.ref
      );

      if (!referenceAsset) {
        throw new Error(`Asset for ref: ${step.ref} not found`);
      }

      setTimeout(() => {
        audioPlayer.stop(referenceAsset.src);
      }, step.timestamp);
    }

    if (step.action === AudioActions.resume) {
      const referenceAsset = assetsAlreadyLoaded.find(
        ({ id }) => id === step.ref
      );

      if (!referenceAsset) {
        throw new Error(`Asset for ref: ${step.ref} not found`);
      }

      setTimeout(() => {
        audioPlayer.resume(referenceAsset.src);
      }, step.timestamp);
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
