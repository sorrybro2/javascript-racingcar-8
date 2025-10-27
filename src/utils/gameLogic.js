export function initCarStatus(carList){
    return Object.fromEntries(carList.map((name)=>[name, 0]));
}