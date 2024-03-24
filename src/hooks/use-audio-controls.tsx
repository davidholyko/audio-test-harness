import { useEffect, useMemo, useState } from 'react';
import { AudioEvent, AudioSource } from '../types/audio.types';
import { audioPlayer } from '../utils/audio-player';

export const useAudioControls = (src: AudioSource) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [eventStatus, setEventStatus] = useState<AudioEvent>();

  useEffect(() => {
    audioPlayer.load(src, {
      callbacks: {
        onEventChange: (status: AudioEvent) => {
          setEventStatus(status);
          !isLoaded && setIsLoaded(true);
        },
      },
    });

    return () => {
      audioPlayer.unload(src);
    };
  }, []);

  const { play, pause, stop, resume } = useMemo(
    () => audioPlayer.getAudio(src),
    [isLoaded]
  );

  const status = useMemo(() => audioPlayer.getAudio(src).status, [eventStatus]);

  return {
    ...status,
    play,
    pause,
    stop,
    resume,
  };
};
