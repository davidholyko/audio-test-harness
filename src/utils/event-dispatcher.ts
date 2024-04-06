import EventEmitter from 'eventemitter3';

class EventDispatcher extends EventEmitter {
  #isLogEnabled: boolean = false;

  constructor() {
    super();
  }

  enableLogs() {
    this.#isLogEnabled = true;
  }

  disableLogs() {
    this.#isLogEnabled = false;
  }

  emit(...args: Parameters<EventEmitter['emit']>) {
    const [event, ...eventArgs] = [...args];

    if (this.#isLogEnabled) {
      console.log(`Event: ${event.toString()}`, ...eventArgs);
    }

    return super.emit(event, ...eventArgs);
  }
}

export const eventDispatcher = new EventDispatcher();
