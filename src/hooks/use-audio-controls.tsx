import { useEffect, useMemo, useState } from 'react';
import { AudioEvents, AudioSource } from '../types/audio.types';
import { audioPlayer } from '../utils/audio-player';

export const useAudioControls = (src: AudioSource) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [eventStatus, setEventStatus] = useState<AudioEvents>(AudioEvents.not_loaded);

  useEffect(() => {
    audioPlayer.load(src, {
      callbacks: {
        onEventChange: (status: AudioEvents) => {
          setEventStatus(status);
          !isLoaded && setIsLoaded(true);
        },
      },
    });

    return () => {
      audioPlayer.unload(src);
    };
  }, []);

  const controls = useMemo(() => {
    return {
      play: () => audioPlayer.play(src),
      pause: () => audioPlayer.pause(src),
      stop: () => audioPlayer.stop(src),
      resume: () => audioPlayer.resume(src),
    };
  }, [isLoaded]);

  const status = useMemo(() => {
    /**
     * Audio is resumable if:
     *   * it has already been played and then paused
     */
    const isResumable = eventStatus === AudioEvents.paused;
    /**
     * Audio is resumable if:
     *   * it is currently playing
     */
    const isStoppable = eventStatus === AudioEvents.playing;
    /**
     * Audio is resumable if:
     *   * it is currently playing
     */
    const isPausable = eventStatus === AudioEvents.playing;
    /**
     * Audio is playable if:
     *   * it has not started or ended
     *   * it is not currently playing
     */
    const isPlayable = [AudioEvents.loaded, AudioEvents.ended, AudioEvents.stopped].includes(
      eventStatus
    );

    return {
      isResumable,
      isStoppable,
      isPausable,
      isPlayable,
    };
  }, [eventStatus]);

  return {
    ...status,
    ...controls,
  };
};
