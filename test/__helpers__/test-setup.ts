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
          howl.updatePlayOffset(timestamp);

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
      }, timestamp + INTERVAL);
    }

    if (action === AudioActions.resume) {
      setTimeout(() => {
        audioPlayer.injectionForTesting(referenceAsset.src, (howl) => {
          howl.updatePlayOffset(timestamp);

          // @ts-expect-error | About branded numbers
          howl.updatePauseOffset(timestamp - howl.seek());
        });

        audioPlayer.resume(referenceAsset.src);
      }, timestamp);
    }
  });
};

export function fullSetup({
  assets,
  sequence,
  assertions,
}: {
  assets: AudioAsset[];
  sequence: AudioStep[];
  assertions: AudioAssertion[];
}) {
  startCleanSlate();
  const auditLogger = setupAuditTrail(assertions);
  loadAssets(sequence, assets);
  performSequenceSteps(sequence, assets);

  vi.runAllTimers();

  return auditLogger;
}
