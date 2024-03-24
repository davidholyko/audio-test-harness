# Audio Test Harness

## Purpose

This repo exists to help figure out how to test audio in a browser in a node environment

## Setup

```shell
nvm use
npm ci
npm run build
```

## Development

```shell
npm run dev
```

## Tests

We have different levels of test cases based on their complexity.

```shell
# run all tests
npm run test

# run a single test
npm run test test/__integration_tests__/01-level-02-single-audio-plays-to-end.test.ts
```

### Test Cases [Level 1]

_These test cases check very basic functionality against Howler + HowlerMock_

1. Check that Audio can load
1. Check that Audio can play until natural end
1. Check that Audio can resume after pause
1. Check that Audio can pause
1. Check that Audio can stop

### Test Cases [Level 2]

_These test cases check that the Audio Test Harness can handle more complicated logic around sequences_

1. Check audio can play after a small delay after loading
1. Check audio can resume after a small delay after pausing

### Test Cases [Level 3]

_These test cases check that the Audio Test Harness can handle multiple streams_

1. Check that multiple audios can play, pause, stop, end together
