import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async run() {
    const car_list = await MissionUtils.Console.readLineAsync();
    const count = await MissionUtils.Console.readLineAsync();

    const car_racing = {};

    car_list.forEach((name) => car_racing[name] = 0);

    for(let i = 0; i < count; i++){
      car_list.forEach((name) => {
        const random_num = MissionUtils.Random.pickNumberInRange(0, 9);
        if(random_num >= 4){
          car_racing[name] += 1;
        }
      });
    }

  }
}

export default App;
