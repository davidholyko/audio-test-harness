import { useAudioControls } from '../hooks/use-audio-controls';
import { AudioSample } from '../types/audio.types';

type AudioControlsProps = {
  sample: AudioSample;
};

export function AudioControls({ sample }: AudioControlsProps) {
  const { src, name, speech_to_text, markers } = sample;

  const controls = useAudioControls(src, markers);

  return (
    <div
      id={name}
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
      <p className="italics">
        {speech_to_text.split(' ').map((word) => (
          <span key={word}>
            <span data-word={word}>{word}</span>
            <span>&nbsp;</span>
          </span>
        ))}
      </p>
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
