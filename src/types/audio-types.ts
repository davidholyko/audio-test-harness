/**
 * a URL like:
 *
 * https://audio-samples.github.io/samples/mp3/blizzard_tts_unbiased/sample-6/fake-0.mp3
 */
export type AudioSource = string & { __brand: 'AudioSource' };

export type OnLoadCompletedFn = () => void;
