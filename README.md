# Worker Promise

Simple little Promise wrapper for WebWorkers. Make your workers pinky swear.

[![Build Status](https://img.shields.io/travis/belsrc/worker-promise.svg?style=flat-square)](https://travis-ci.org/belsrc/worker-promise)
[![Maintainability](https://img.shields.io/codeclimate/maintainability/belsrc/worker-promise.svg?style=flat-square)](https://codeclimate.com/github/belsrc/worker-promise/maintainability)
[![Code Coverage](https://img.shields.io/codecov/c/github/belsrc/worker-promise/master.svg?style=flat-square)](https://codecov.io/gh/belsrc/worker-promise/branch/master)
[![Known Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/belsrc/worker-promise.svg?style=flat-square)](https://app.snyk.io/org/belsrc/project/0623bc36-ba88-4751-b85c-6f93c28b5f7c)
[![Last Commit](https://img.shields.io/github/last-commit/belsrc/worker-promise/master.svg?style=flat-square)](https://github.com/belsrc/worker-promise/commits/master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/belsrc/worker-promise/pulls)

# Install

```
npm i -s @belsrc/worker-promise
```

# Use
```js
// Example using webpack and worker-loader
import workerPromise from '@belsrc/worker-promise';
import Worker from './process.worker';

const worker = new Worker();

workerPromise(worker, { count: 500000 }).then(res => console.log(res));
```

also supports callbacks using the optional third parameter.

`workerPromise(webworker, value[, callback])`

with the callback being

`function(error, value)`

I don't advise using with `async..await` as it still blocks.

```js
// async-await
const res = await workerPromise(worker, { count: 500000 });
console.log(res);
// calling worker
// processing: 2136.183837890625ms
// {error: null, data: Array(41538)}
// back on the main thread

// promise-then
workerPromise(worker, { count: 500000 }).then(res => console.log(res));
// calling worker
// back on the main thread
// processing: 2149.153076171875ms
// {error: null, data: Array(41538)}

// callback
const logRes = (err, res) => console.log(res);
workerPromise(worker, { count: 500000 }, logRes);
// calling worker
// back on the main thread
// processing: 2131.60205078125ms
// {error: null, data: Array(41538)}
```

## LICENCE

[MIT](LICENCE)




Add repo tracking to
  https://app.snyk.io/org/belsrc
  https://codeclimate.com/github/belsrc/
  https://codecov.io/gh/belsrc/
  https://travis-ci.org/belsrc/

You will need the code cov key so that it can be added to the travis ci env variables
For the Snyk badge, youll need the projects custom key

Will probably want to update packages too (`npm run check`)
