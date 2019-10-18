/* eslint-disable promise/catch-or-return, promise/prefer-await-to-then, promise/always-return */
/* eslint-disable array-element-newline, array-bracket-newline */
/* eslint-disable promise/prefer-await-to-callbacks */
import '@babel/register';
import 'jsdom-worker';
import workerPromise from './index';

const code = `
const thread = self;
const handleProcessing = ({ data }) => {
  const val = data.reduce((acc, curr) => acc + curr, 0);
  thread.postMessage(val);
};
self.addEventListener('message', handleProcessing);
`;

describe('worker-promise', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('should return value for awaited promise', async () => {
    const worker = new Worker(URL.createObjectURL(new Blob([code])));

    const actual = await workerPromise(worker, [ 1, 2, 3, 4, 1, 2, 3, 4 ]);

    expect(actual).toEqual(20);
  });

  test('should return value for callback', done => {
    const worker = new Worker(URL.createObjectURL(new Blob([code])));

    workerPromise(worker, [ 1, 2, 3, 4, 1, 2, 3, 4 ], (_, actual) => {
      expect(actual).toEqual(20);
      return done();
    });
  });

  test('should reject for bad promise', async () => {
    const worker = new Worker(URL.createObjectURL(new Blob([code])));

    expect.assertions(1);
    await expect(workerPromise(worker, 5)).rejects.toBeTruthy();
  });

  test('should return error in callback', done => {
    const worker = new Worker(URL.createObjectURL(new Blob([code])));

    workerPromise(worker, 5, err => {
      expect(err instanceof Error).toBeTruthy();
      return done();
    });
  });
});

