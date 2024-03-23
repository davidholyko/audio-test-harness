export const AUDIOS = [
  {
    id: 1,
    name: 'Audio 1',
    src: 'https://audio-samples.github.io/samples/mp3/ted_val/sample-1.mp3',
  },
];

export const ACTIONS = [
  // Audio1.play()
];

export const PATTERN = [
  [
    'LOADED',
    { src: 'https://audio-samples.github.io/samples/mp3/ted_val/sample-1.mp3' },
  ],
  [
    'PLAYING',
    { src: 'https://audio-samples.github.io/samples/mp3/ted_val/sample-1.mp3' },
  ],
  [
    'ENDED',
    { src: 'https://audio-samples.github.io/samples/mp3/ted_val/sample-1.mp3' },
  ],
];
