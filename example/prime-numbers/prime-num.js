/* eslint-disable */
// Sieve of Eratosthenes prime implementation
const getPrimes = (max) => {
  const arr = [];

  for (let i = 2; i <= max; ++i) {
    if (arr.every((p) => i % p)) {
      arr.push(i);
    }
  }

  return arr;
};

export default getPrimes;
