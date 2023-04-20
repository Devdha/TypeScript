# 함수

## 함수 선언과 호출

- 타입 스크립트에서 함수는 일급(first-class) 객체이다.

  - 따라서, 객체를 다루듯이 함수를 할당, 다른 함수로 전달, 함수를 반환하는 등 객체에서 할 수 있는 작업을 할 수 있다. 자바스크립트에서 함수로 할 수 있는 일이 많고, 이를 통해 타입스크립트는 이를 자신의 타입 시스템에 녹여냈다.

  <details>
  <summary>일급 객체</summary>

  - 컴퓨터 프로그래밍 언어 디자인에서, 일급 객체(영어: first-class object)란 다른 객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 객체를 가리킨다. 보통 함수에 인자로 넘기기, 수정하기, 변수에 대입하기와 같은 연산을 지원할 때 일급 객체라고 한다. ref. 위키백과
  - 일급 객체는 아래와 같은 특성을 가진다.

    - 변수에 할당할 수 있다.
    - 함수의 인자로 넘겨질 수 있다.
    - 함수의 반환 값이 될 수 있다.
    - 동적으로 생성이 가능하다.
      https://stackoverflow.com/questions/245192/what-are-first-class-objects

    ```
    Regarding objects that are not first-class in TypeScript, one could argue that certain language
    constructs, such as control structures (e.g., if, while, for) or operators (e.g., +, -, *, /) are not
    first-class objects since they cannot be assigned to variables, passed as parameters, or returned as
    values from functions stackoverflow.com. However, these constructs are generally considered part of the
    language syntax rather than objects.

    In summary, TypeScript treats functions as first-class objects, allowing them to be used in the same way
    as other variables in the language. Certain language constructs, such as control structures and operators,
    are not considered first-class objects, but this is because they are part of the language syntax rather
    than actual objects.
    ```

 </details>

- 타입 스크립트의 함수 선언 방법
  - 이름이 있는 함수
    ```typescript
    function add(x: number, y: number) {
      return x + y;
    }
    ```
  - 함수 표현식
    ```typescript
    const add = function (x: number, y: number) {
      return x + y;
    };
    ```
  - 화살표 함수
    ```typescript
    const add = (x: number, y: number) => {
      return x + y;
    };
    ```
  - 단축형 화살표 함수
    ```typescript
    const add = (x: number, y: number) => x + y;
    ```
  - 함수 생성자
    ```typescript
    // 사용하지 않는 편이 좋다.
    // 대체로 메소드를 가진 클래스틑 선언하는 방식을 추천한다.
    // 타입 사용도 불가능하지 않을까...?
    const add = new Function("x", "y", "return x + y");
    ```

### 선택적 / 기본 매개변수

```typescript
// 나머지 매개변수
// 필수 매개변수 지정 후 뒤에 추가
function log(message: string, context?: Context);

type Context = {
  appId?: string;
  userId?: string;
};

function log(message: string, context: Context = {});
// 실무에서는 기본 매개변수를 더 자주 사용
```

### 나머지 매개변수

인수를 여러 개 받는 함수는 배열 형태로 받을 수 있다.

```typescript
// 배열로 전달하는 방식
function sum(number: number[]);

// arguments 객체
// 자바스크립트 런타임이 함수에 자동으로 arguments를 정의하는 요술 같은 방식
// * 단점: 안전하지 않다.(내부에서 사용하는 모든 타입을 any로 추론)
function sumVariadic(): number {
  return Array.from(arguments).reduce(
    (total: number, n: number) => total + n,
    0
  );
}

// 또한 타입스크립트에서 인수를 받지 않도록 설정했지만, 인수를 받아서 타입 에러를 발생시킨다.
sumVariadic(1, 2, 3); // Error: Expected 0 arguments, but got 3.
```

타입스크립트에서는 나머지(rest) 매개변수로 인자를 안전하게 받을 수 있다.

```typescript
function sumVariadicSafe(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
```

### call, apply, bind

자바스크립트는 괄호 외에도 함수를 호출하는 방법을 제공하는데, 아래 예를 보자

```typescript
function add(a: number, b: number): number {
  return a + b;
}

add(1, 2); // 3
add.apply(null, [1, 2]); // 3
add.call(null, 1, 2); // 3
add.bind(null, 1, 2)(); // 3
```

- apply: 첫 번째 인자는 this로 사용할 객체, 두 번째 인자는 함수에 전달할 인자를 배열로 전달한다.
- call: 첫 번째 인자는 this로 사용할 객체, 두 번째 인자부터는 함수에 전달할 인자를 나열한다.
- bind: 첫 번째 인자는 this로 사용할 객체, 두 번째 인자부터는 함수에 전달할 인자를 나열한다. bind는 함수를 반환한다.(호출하지 않는다.)

### this의 타입

자바스크립트의 this는 모든 함수에 정의된다.
하지만 호출 방식에 따라 값이 달라져 자바스크립트의 코드를 이해/사용하기 어렵게 만든다.
(어제 class 내에서 Map 내부에 함수를 매핑할 수 있도록 만들었는데, 함수 내부에서 this는 map을 가리키고 있었다. 🤯)

```typescript
let a = {
  b() {
    return this;
  },
};
// 위 함수에서 this는 객체 x이다.
// 하지만 아래와 같이 호출하면 값이 달라진다.

let c = a.b;
c();
```

**this의 동작은 예상과 "크게" 다를 수 있다.**

타입스크립트에서는 this의 타입을 첫 번째 매개변수로 선언하는 방식으로 지정할 수 있다.

```typescript
function f(this: Date) {
  return this.getDate();
}

f.call(new Date());
f(); // Error: this의 타입이 void가 아니기 때문에 에러가 발생한다.
```

- TSC 플래그: noImplicitThis

### 제너레이터 함수

- 여러 개의 값을 생성하는 편리한 기능을 제공
- 함수명 앞에 붙은 \*로 제너레이터임을 표시

```typescript
function* createFibonacciGenerator() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a; // yield 키워드로 값을 반환
    [a, b] = [b, a + b];
  }
}

const fibonacciGenerator = createFibonacciGenerator();
fibonacciGenerator.next(); // { value: 0, done: false }
fibonacciGenerator.next(); // { value: 1, done: false }
fibonacciGenerator.next(); // { value: 1, done: false }
fibonacciGenerator.next(); // { value: 2, done: false }
fibonacciGenerator.next(); // { value: 3, done: false }
```

### 반복자

- iterator
- 제너레이터와 상생 관계로 제너레이터 함수를 호출하면 Symbol.iterator 프로퍼티와 next 메서드가 정의된 값을 얻는다. -> 이터러블 + 반복자의 결합 -> 제너레이터

```typescript
let numbers = {
  *[Symbol.iterator]() {
    for (let n = 1; n <= 10; n++) {
      yield n;
    }
  },
};
// let numbers: { [Symbol.iterator](): IterableIterator<number> }
```

내장 컬렉션 타입의 반복자도 정의할 수 있다.

```typescript
// for-of로 반복자 반복
let numbers = [1, 2, 3];
for (let n of numbers) {
  console.log(n);
}

// 반복자 스프레드
let allNumbers = [...numbers];

// 반복자 구조 분해 할당
let [first, second, ...rest] = numbers;
```

## 호출 시그니처

### 문맥적 타입화

### 오버로드된 함수 타입

## 다형성

### 언제 제네릭 타입이 한정되는가?

### 제네릭을 어디에 선언할 수 있을까?

### 제네릭 타입 추론

### 제네릭 타입 별칭

### 한정된 다형성

### 제네릭 타입 기본값

## 타입 주도 개발

```

```

```

```

```

```
