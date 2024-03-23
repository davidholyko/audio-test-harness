import { useEffect, useMemo, useState } from 'react';
import { audioPlayer } from '../utils/audio-player';
import { AudioSource } from '../types/audio.types';

type AudioControlsProps = {
  src: AudioSource;
  name: string;
};

function noop() {}

export function AudioControls(props: AudioControlsProps) {
  const { src, name } = props;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    audioPlayer.load(src, { onLoadCompleted: () => setIsLoaded(true) });

    return () => {
      audioPlayer.unload(src);
    };
  }, []);

  const { play, pause, stop, resume } = useMemo(() => {
    if (!isLoaded) {
      return {
        play: noop,
        pause: noop,
        stop: noop,
        resume: noop,
      };
    }

    return audioPlayer.getAudio(src);
  }, [isLoaded]);

  return (
    <div>
      <p>{name}</p>
      <p>{src}</p>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={stop}>Stop</button>
      <button onClick={resume}>Resume</button>
    </div>
  );
}
