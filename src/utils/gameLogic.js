import { MissionUtils } from "@woowacourse/mission-utils";

export function initCarStatus(list){
    return Object.fromEntries(list.map((name)=>[name, 0]));
}

export function racing(cars, status){
    cars.forEach((name) => {
        const random_num = MissionUtils.Random.pickNumberInRange(0, 9);
        if(random_num >= 4){
          status[name] += 1;
        }
    });
}

export function raceStatusPrint(status){
    for(const name in status){
        const value = status[name];
        MissionUtils.Console.print(`${name} : ` + '-'.repeat(value));
    }
}