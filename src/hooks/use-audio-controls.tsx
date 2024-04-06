import { useEffect, useMemo, useState } from 'react';
import { AudioEvent, AudioEvents, AudioSource } from '../types/audio.types';
import { audioPlayer } from '../utils/audio-player';

const { not_loaded, loaded, playing, paused, stopped, ended } = AudioEvents;

export const useAudioControls = (src: AudioSource) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [logs, setLogs] = useState<AudioEvent[]>([not_loaded]);
  const log = useMemo(() => [...logs].pop(), [logs])!;

  useEffect(() => {
    audioPlayer.load(src, {
      callbacks: {
        onEventChange: (status: AudioEvents) => {
          setLogs((prevStatus) => [...prevStatus, status]);
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
    const isResumable = log === paused;
    /**
     * Audio is stoppable if:
     *   * it is currently playing
     */
    const isStoppable = log === playing;
    /**
     * Audio is pausable if:
     *   * it is currently playing
     */
    const isPausable = log === playing;
    /**
     * Audio is playable if:
     *   * it has not started
     *   * it has already ended
     *   * it has already been stopped
     */
    const isPlayable = [loaded, ended, stopped].includes(AudioEvents[log]);

    return {
      isResumable,
      isStoppable,
      isPausable,
      isPlayable,
    };
  }, [logs]);

  return {
    ...status,
    ...controls,
  };
};
