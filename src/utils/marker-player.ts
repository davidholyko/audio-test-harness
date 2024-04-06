import {
  AudioMarker,
  AudioMarkerId,
  MarkerActions,
  TimeInMilleseconds,
} from '../types/audio.types';

class MarkerPlayer implements MarkerActions {
  #srcMap: Record<AudioMarkerId, { fired: boolean }> = {};

  addMarkers(markers?: AudioMarker[]) {
    markers?.forEach((marker) => {
      this.#srcMap[marker.id] = { fired: false };
    });
  }

  resetMarkers(markers?: AudioMarker[]) {
    markers?.forEach((marker) => {
      this.#srcMap[marker.id] = { fired: false };
    });
  }

  fireMarkers(markers: AudioMarker[], time: TimeInMilleseconds) {
    markers.forEach((marker) => {
      const { timestamp, name, args } = marker.action;

      if (this.#srcMap[marker.id]?.fired) {
        return;
      }

      if (time <= timestamp) {
        return;
      }

      // @ts-expect-error 'A spread argument must either have a tuple type or be passed to a rest parameter.'
      this[name](...args);
      this.#srcMap[marker.id] = { fired: true };
    });
  }

  highlight(selector: string) {
    const element = document.querySelector(selector);

    if (!element) {
      throw new Error(`Element ${selector} not found`);
    }

    element.classList.add('highlight');
  }

  unhighlight(selector: string) {
    const element = document.querySelector(selector);

    if (!element) {
      throw new Error(`Element ${selector} not found`);
    }

    element.classList.remove('highlight');
  }

  bold_all() {
    //
  }

  unbold_all() {
    //
  }
}

export const markerPlayer = new MarkerPlayer();
