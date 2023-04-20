function sumVariadic(): number {
  return Array.from(arguments).reduce(
    (total: number, n: number) => total + n,
    0
  );
}

// sumVariadic(1, 2, 3); // Error: Expected 0 arguments, but got 3.

function sumVariadicSafe(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

sumVariadicSafe(1, 2, 3);

function* createFibonacciGenerator() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a; // yield 키워드로 값을 반환
    [a, b] = [b, a + b];
    if (a === 3) break;
  }
}

const fibonacciGenerator = createFibonacciGenerator();
fibonacciGenerator.next(); // { value: 0, done: false }
fibonacciGenerator.next(); // { value: 1, done: false }
fibonacciGenerator.next(); // { value: 1, done: false }
fibonacciGenerator.next(); // { value: 2, done: false }
fibonacciGenerator.next(); // { value: 3, done: false }
fibonacciGenerator.next(); // { value: undefined, done: true }
