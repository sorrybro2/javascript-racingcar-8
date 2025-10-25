import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async run() {

    // 입력값 잘 이용할 수 있게 파싱
    const car_list_input = await MissionUtils.Console.readLineAsync();
    const car_list = car_list_input.split(",");
    const count = await MissionUtils.Console.readLineAsync();

    const car_racing = {};

    car_list.forEach((name) => car_racing[name] = 0);


    // 랜덤한 숫자로 레이싱 진행 및 진행도 출력
    for(let i = 0; i < count; i++){
      car_list.forEach((name) => {
        const random_num = MissionUtils.Random.pickNumberInRange(0, 9);
        if(random_num >= 4){
          car_racing[name] += 1;
        }
      });

      for(const name in car_racing){
        const value = car_racing[name];
        MissionUtils.Console.print(`${name} : ` + '-'.repeat(value));
      }
    }

    // 우승자 및 공동 우승자 구하기!
    const max = Math.max(...Object.values(car_racing));
    const winner = Object.keys(car_racing).filter((name) =>
      car_racing[name] == max
    );

    MissionUtils.Console.print(`최종 우승자 : ${winner.join(', ')}`);
  }
}

export default App;
