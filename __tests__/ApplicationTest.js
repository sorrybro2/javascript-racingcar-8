import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("자동차 경주", () => {
  test("기능 테스트1", async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["pobi,woni", "1"];
    const logs = ["pobi : -", "woni : ", "최종 우승자 : pobi"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("기능 테스트2", async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["pobi,woni,mogi", "5"];
    const logs = [
    "pobi : ", "woni : ", "mogi : -",
    "pobi : -", "woni : ", "mogi : -",
    "pobi : -", "woni : ", "mogi : --",
    "pobi : -", "woni : -", "mogi : --",
    "pobi : -", "woni : -", "mogi : ---",
    "최종 우승자 : mogi"
  ];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([
      STOP, STOP, MOVING_FORWARD,
      MOVING_FORWARD, STOP, STOP,
      STOP, STOP, MOVING_FORWARD,
      STOP, MOVING_FORWARD, STOP,
      STOP, STOP, MOVING_FORWARD,
    ]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

    test("공동 우승자", async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["pobi,woni,mogi", "5"];
    const logs = [
    "pobi : -", "woni : ", "mogi : ",
    "pobi : --", "woni : ", "mogi : ",
    "pobi : --", "woni : -", "mogi : ",
    "pobi : --", "woni : --", "mogi : ",
    "pobi : --", "woni : --", "mogi : -",
    "최종 우승자 : pobi, woni"
  ];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([
      MOVING_FORWARD, STOP, STOP,
      MOVING_FORWARD, STOP, STOP,
      STOP, MOVING_FORWARD, STOP,
      STOP, MOVING_FORWARD, STOP,
      STOP, STOP, MOVING_FORWARD,
    ]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });


describe("예외 입력 테스트", () => {
  test.each([
    {
      name: "시도 횟수 없음 (2번째 입력 안 넣음)",
      inputs: ["pobi,javaji"]
    },
    {
      name: "플레이어 이름 5글자 이상",
      inputs: ["pobizzang,wonitv", "2"]
    },
    {
      name: "시도 횟수가 숫자가 아님 (문자열)",
      inputs: ["pobi,woni", "aa"]
    },
    {
      name: "시도 횟수가 자연수가 아님 (음수)",
      inputs: ["pobi,woni", "-3"]
    },
    {
      name: "시도 횟수가 자연수가 아님 (소수)",
      inputs: ["pobi,woni", "2.7"]
    },
  ])("$name", async ({ inputs }) => {
    // given
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });
});
});
