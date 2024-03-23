import EventEmitter from 'eventemitter3';

class EventDispatcher extends EventEmitter {
  logsEnabled: boolean;

  constructor() {
    super();

    this.logsEnabled = false;
  }

  enableLogs() {
    this.logsEnabled = true;
  }

  disableLogs() {
    this.logsEnabled = false;
  }

  emit(...args: Parameters<EventEmitter['emit']>) {
    const [event, ...eventArgs] = [...args];

    if (this.logsEnabled) {
      console.log(`Event: ${event.toString()}`, ...eventArgs);
    }

    return super.emit(event, ...eventArgs);
  }
}

export const eventDispatcher = new EventDispatcher();
