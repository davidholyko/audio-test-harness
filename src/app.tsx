import { AudioControls } from './components/audio-controls';
import { EventDispatcherControls } from './components/event-dispatcher-controls';
import { AUDIO_URLS } from './constants';

export function App() {
  return (
    <div>
      <h1>Audio App</h1>
      <EventDispatcherControls />
      {AUDIO_URLS.map((audioAsset) => {
        const { id, src, name } = audioAsset;
        return <AudioControls key={id} src={src} name={name} />;
      })}
    </div>
  );
}
