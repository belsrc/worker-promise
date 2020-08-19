/* eslint-disable promise/prefer-await-to-callbacks, array-element-newline, array-bracket-newline */
import '@babel/register';
import 'jsdom-worker';
import workerPromise from './index';

const simple = `
const thread = self;
const handleProcessing = ({ data }) => {
  const val = data.reduce((acc, curr) => acc + curr, 0);
  thread.postMessage(val);
};
self.addEventListener('message', handleProcessing);
`;
const nested = `
const thread = self;
const handleProcessing = ({ data }) => {
  try {
    const val = data.reduce((acc, curr) => acc + curr, 0);
    thread.postMessage({
      error: null,
      data: val,
    });
  }
  catch(error) {
    thread.postMessage({
      error: error.message,
      data: null,
    });
  }
};
self.addEventListener('message', handleProcessing);
`;

describe('worker-promise', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('should return value for awaited promise', async () => {
    const worker = new Worker(URL.createObjectURL(new Blob([simple])));

    const actual = await workerPromise(worker, [ 1, 2, 3, 4, 1, 2, 3, 4 ]);

    expect(actual).toEqual(20);
  });

  test('should return value for callback', done => {
    const worker = new Worker(URL.createObjectURL(new Blob([simple])));

    workerPromise(worker, [ 1, 2, 3, 4, 1, 2, 3, 4 ], (_, actual) => {
      expect(actual).toEqual(20);
      return done();
    });
  });

  test('should reject for bad promise', async () => {
    const worker = new Worker(URL.createObjectURL(new Blob([simple])));

    expect.assertions(1);
    await expect(workerPromise(worker, 5)).rejects.toBeTruthy();
  });

  test('should return error in callback', done => {
    const worker = new Worker(URL.createObjectURL(new Blob([simple])));

    workerPromise(worker, 5, err => {
      expect(err instanceof Error).toBeTruthy();
      return done();
    });
  });

  test('should reject for nested error promise', async () => {
    const worker = new Worker(URL.createObjectURL(new Blob([nested])));

    expect.assertions(1);
    await expect(workerPromise(worker, 5)).rejects.toBeTruthy();
  });

  test('should return error in callback for nested error', done => {
    const worker = new Worker(URL.createObjectURL(new Blob([nested])));

    workerPromise(worker, 5, err => {
      expect(err instanceof Error).toBeTruthy();
      return done();
    });
  });
});
