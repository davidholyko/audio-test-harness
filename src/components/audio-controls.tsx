import { useAudioControls } from '../hooks/use-audio-controls';
import { AudioSample } from '../constants';

type AudioControlsProps = {
  sample: AudioSample;
};

export function AudioControls({ sample }: AudioControlsProps) {
  const { src, name, speech_to_text } = sample;

  const controls = useAudioControls(src);

  return (
    <div
      style={{
        backgroundColor: 'lightblue',
        padding: '5px',
        margin: '5px',
        borderRadius: '5px',
      }}
    >
      <p>
        {name}
        <a href={src} target="_blank" style={{ paddingLeft: '1ch' }}>
          {src}
        </a>
      </p>
      <p className="italics">{speech_to_text}</p>
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
