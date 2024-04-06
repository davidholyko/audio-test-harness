import { AudioControls } from './components/audio-controls';
import { EventDispatcherControls } from './components/event-dispatcher-controls';
import { AUDIO_SAMPLES } from './constants';
import './app.css';

export function App() {
  return (
    <div>
      <h1>Audio App For Audio Test Harness</h1>
      <EventDispatcherControls />
      {AUDIO_SAMPLES.map((audioSample) => (
        <AudioControls key={audioSample.id} sample={audioSample} />
      ))}
    </div>
  );
}
