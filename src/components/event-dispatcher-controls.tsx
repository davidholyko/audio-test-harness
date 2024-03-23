import { useCallback } from 'react';
import { eventDispatcher } from '../utils/event-dispatcher';

export function EventDispatcherControls() {
  const handleEnableLogs = useCallback(() => {
    eventDispatcher.enableLogs();
  }, []);

  const handleDisableLogs = useCallback(() => {
    eventDispatcher.disableLogs();
  }, []);

  return (
    <div>
      <button onClick={handleEnableLogs}>Enable Logs</button>
      <button onClick={handleDisableLogs}>Disable Logs</button>
    </div>
  );
}
