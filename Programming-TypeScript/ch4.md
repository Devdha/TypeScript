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
type Context = {
  appId?: string;
  userId?: string;
};

function log(message: string, context: Context = {}) {
  //...
}
```

### 나머지 매개변수

### call, apply, bind

### this의 타입

### 제너레이터 함수

### 반복자

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
