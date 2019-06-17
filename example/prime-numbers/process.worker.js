import getPrimes from './prime-num';

const thread = self;

const handleProcessing = msg => {
  const data = msg.data;

  console.time('processing');

  const primes = getPrimes(data.count);

  console.timeEnd('processing');

  // throw new Error('error test');

  thread.postMessage({
    error: null,
    data: primes,
  });
};

self.addEventListener('message', handleProcessing);
