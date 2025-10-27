import { MissionUtils } from "@woowacourse/mission-utils";

export function initCarStatus(list){
    return Object.fromEntries(list.map((name)=>[name, 0]));
}

function goOrNot(status, name){
    const randomNum = MissionUtils.Random.pickNumberInRange(0, 9);
    if(randomNum >= 4){
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