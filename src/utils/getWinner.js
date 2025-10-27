import { MissionUtils } from "@woowacourse/mission-utils";

export function getWinner(status){
    const max = Math.max(...Object.values(status));
    const winner = Object.keys(status).filter((name) =>
        status[name] == max
    );

    MissionUtils.Console.print(`최종 우승자 : ${winner.join(', ')}`);
}