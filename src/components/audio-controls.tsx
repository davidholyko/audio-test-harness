import { useAudioControls } from '../hooks/use-audio-controls';
import { AudioSample } from '../constants';

type AudioControlsProps = {
  sample: AudioSample;
};

export function AudioControls({ sample }: AudioControlsProps) {
  const { src, name, speech_to_text } = sample;

  const controls = useAudioControls(src);

  return (
    <div>
      <p>{name}</p>
      <a href={src} target="_blank">
        {src}
      </a>
      <p>{speech_to_text}</p>
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
