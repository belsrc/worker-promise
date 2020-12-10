const callbackWorker = (worker, val, fn) => {
  try {
    worker.addEventListener('message', ({ data }) =>
      data.error ? fn(new Error(data.error), data) : fn(null, data));
    worker.addEventListener('error', error => fn(error, {}));
    worker.postMessage(val);
  }
  catch(error) {
    return fn(error);
  }
};

const promiseWorker = (worker, val) =>
  // eslint-disable-next-line promise/prefer-await-to-then
  Promise.resolve().then(() =>
    new Promise((resolve, reject) => {
      try {
        worker.addEventListener('message', ({ data }) =>
          data.error ? reject(new Error(data.error)) : resolve(data));
        worker.addEventListener('error', error => reject(error));
        worker.postMessage(val);
      }
      catch(error) {
        return reject(error);
      }
    }));

const asyncWorker = (worker, val, fn) =>
  fn ? callbackWorker(worker, val, fn) : promiseWorker(worker, val);

export default asyncWorker;
