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

class Bet {
  has(value: number): boolean {
    return;
    // ...
  }
  add(value: number): Bet {
    return;
    // ...
  }
}

abstract class A {
  private x = 1;
}

abstract class B {
  private c = 2;

  a() {
    return "a";
  }
}

class C extends B {
  a() {
    return "b";
  }
}

class MessageQueue {
  private constructor(private messages: string[]) {}
}

type Shoe = {
  purpose: string;
};

class BalletFlat implements Shoe {
  purpose = "dancing";
}

class Boot implements Shoe {
  purpose = "woodcutting";
}

class Sneaker implements Shoe {
  purpose = "walking";
}

// 위의 type을 interface로 사용해도 됨
// Shoe 팩토리 구현
let Shoe = {
  create(type: "balletFlat" | "boot" | "sneaker"): Shoe {
    switch (type) {
      case "balletFlat":
        return new BalletFlat();
      case "boot":
        return new Boot();
      case "sneaker":
        return new Sneaker();
    }
  },
};

const s = Shoe.create("boot"); // Shoe
