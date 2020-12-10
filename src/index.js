const isString = value => value != null && value.constructor === String;

const createError = data => {
  const err = new Error(data.message || 'An error occurred');

  Object.entries(err)
    .filter(([ key, val ]) => key !== 'message')
    .forEach(([ key, val ]) => {
      // eslint-disable-next-line fp-jxl/no-mutation
      err[key] = val;
    });

  return err;
};

const callbackWorker = (worker, val, fn) => {
  try {
    worker.addEventListener('message', ({ data }) => {
      if(data.error) {
        return fn(isString(data.error) ? new Error(data.error) : createError(data.error), data);
      }

      return fn(null, data);
    });

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
        worker.addEventListener('message', ({ data }) => {
          if(data.error) {
            return reject(isString(data.error) ? new Error(data.error) : createError(data.error));
          }

          return resolve(data);
        });

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
