/* eslint-disable import/default, promise/catch-or-return, promise/prefer-await-to-then */
import workerPromise from '../../src';
import Worker from './process.worker';

const main = async () => {
  const worker = new Worker();

  console.log('calling worker');

  // async-await
  // const res = await workerPromise(worker, { count: 500000 });
  // console.log(res);

  // promise-then
  workerPromise(worker, { count: 500000 }).then(res => console.log(res));

  // callback
  // const logRes = (err, res) => console.log(res);
  // workerPromise(worker, { count: 500000 }, logRes);

  console.log('back on the main thread');
};

main();
