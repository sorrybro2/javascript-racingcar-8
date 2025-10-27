import { MissionUtils } from "@woowacourse/mission-utils";
import { validateInput } from "./utils/validator.js";
import { initCarStatus, racing, raceStatusPrint,} from "./utils/gameLogic.js";
import { getWinner } from "./utils/getWinner.js";

class App {
  async run() {

    // 입력값 잘 이용할 수 있게 파싱
    const carInput= await MissionUtils.Console.readLineAsync();
    const carList = carInput.split(",");
    const count = await MissionUtils.Console.readLineAsync();

    // 잘못 입력 시 [ERROR] 문구와 함께 예외를 발생
    validateInput(carList, count);

    // 레이싱 진행 초기화
    const carRaceStatus = initCarStatus(carList);

    //레이싱 진행 및 진행도 출력
    for(let i = 0; i < count; i++){
      racing(carList, carRaceStatus);
      raceStatusPrint(carRaceStatus);
    }

    // 우승자 및 공동 우승자 구하기!
    getWinner(carRaceStatus);
  }
}

export default App;
