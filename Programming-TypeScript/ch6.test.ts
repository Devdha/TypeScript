type UserWithId = {
  id: number;
  name: string;
};

type User = {
  name: string;
};

function deleteUser(user: { id?: number; name: string }) {
  delete user.id;
}

const user: UserWithId = {
  id: 123,
  name: "donghun",
};

deleteUser(user);

type SuperUser = {
  id?: number | string;
  name: string;
};

let superUser: SuperUser = {
  id: "838923",
  name: "Donghun",
};

// deleteUser(superUser);

function superFunction(id: number | string) {
  return id;
}

superFunction("123");

type Options = {
  url: string;
  size?: number;
  tier?: "prod" | "dev";
};

class API {
  constructor(private options: Options) {}
}

new API({
  url: "http://api.com",
  tier: "prod",
});

// 만약 철자를 틀리면
new API({
  url: "http://api.com",
  //   tirr: "prod",
});

type Unit = "cm" | "px" | "%";
let units: Unit[] = ["cm", "px", "%"];

function parseUnit(value: string): Unit | null {
  for (let i = 0; i < units.length; i++) {
    if (value.endsWith(units[i])) {
      return units[i];
    }
  }
  return null;
}

type Width = { unit: Unit; value: number };
function parseWidth(width: number | string | null | undefined): Width | null {
  // width가 null이거나 undefined면 일찍 반환
  if (width == null) {
    return null;
  }
  if (typeof width === "number") {
    return { unit: "px", value: width };
  }
  let unit = parseUnit(width);
  if (unit) {
    return { unit, value: parseFloat(width) };
  }
  return null;
}

function isBig(n: number) {
  if (n >= 100) {
    return true;
  }
}

type APIResponse = {
  user: {
    userId: string;
    friendList: {
      count: number;
      friends: {
        firstName: string;
        lastName: string;
      }[];
    };
  };
};

// 위 타입에서 friendList 프로퍼티의 타입을 사용하려 하면 다시 선언하는 등 불편함이 따른다.
// 하지만 key in 연산자를 사용하면 편리하다.
type FriendList = APIResponse["user"]["friendList"];

type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
type Day = Weekday | "Sat" | "Sun";
// let nextDay: Record<Weekday, Day> = { Mon: "Tue" };

// let nestDay: { [K in Weekday]: Day } = {
//   Mon: "Tue",
// };

function isString(a: unknown): boolean {
  return typeof a === "string";
}

function parseInput(input: string | number) {
  let formattedInput: string;
  if (isString(input)) {
    formattedInput = input.toUpperCase();
  }
}
