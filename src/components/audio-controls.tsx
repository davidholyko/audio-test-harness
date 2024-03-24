import { AudioSource } from '../types/audio.types';
import { useAudioControls } from '../hooks/use-audio-controls';

type AudioControlsProps = {
  src: AudioSource;
  name: string;
};

export function AudioControls(props: AudioControlsProps) {
  const { src, name } = props;

  const controls = useAudioControls(src);

  return (
    <div>
      <p>{name}</p>
      <p>{src}</p>
      <button onClick={controls.play} disabled={!controls.isPlayable}>
        ▶️ Play
      </button>
      <button onClick={controls.pause} disabled={!controls.isPausable}>
        ⏸️ Pause
      </button>
      <button onClick={controls.stop} disabled={!controls.isStoppable}>
        ⏹️ Stop
      </button>
      <button onClick={controls.resume} disabled={!controls.isResumable}>
        🔊 Resume
      </button>
    </div>
  );
}
