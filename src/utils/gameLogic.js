import { MissionUtils } from "@woowacourse/mission-utils";

const RANDOM_MIN = 0;
const RANDOM_MAX = 9;
const MOVE_NUM = 4

export function initCarStatus(list){
    return Object.fromEntries(list.map((name)=>[name, 0]));
}

function goOrNot(status, name){
    const randomNum = MissionUtils.Random.pickNumberInRange(RANDOM_MIN, RANDOM_MAX);
    if(randomNum >= MOVE_NUM){
      status[name] += 1;
    }
}

export function racing(cars, status){
    cars.forEach((name) => {
        goOrNot(status, name);
    });
}

export function raceStatusPrint(status){
    for(const name in status){
        const value = status[name];
        MissionUtils.Console.print(`${name} : ` + '-'.repeat(value));
    }
}