const MAX_NAME_LENGTH = 5;

export function validateInput(list, count){

    // 플레이어 이름 미기입 혹은 시도 횟수 미기입 혹은 둘다 미기입 검증
    if(count == null){
      throw new Error("[ERROR]");
    }
    
    // 플레이어 이름 길이 검증
    else if(list.some(n => n.length > MAX_NAME_LENGTH)){
      throw new Error("[ERROR]");
    }
    
    // 시도 횟수 검증 (자연수)
    else if(isNaN(Number(count)) || Number(count) < 0 || !Number.isInteger(Number(count))){
      throw new Error("[ERROR]");
    }

    // 플레이어 중복 이름 검증
    for(let i = 0; i < list.length; i++){
      for(let j = i+1; j < list.length; j++){
        if(list[j] == list[i]){
          throw new Error("[ERROR]");
        }
      }
    }
}