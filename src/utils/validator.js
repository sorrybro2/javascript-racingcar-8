const MAX_NAME_LENGTH = 5;

export function validateInput(list, count){
  validateCountExists(count);      // 플레이어 이름 미기입 혹은 시도 횟수 미기입 혹은 둘다 미기입 검증
  validateNameLength(list);        // 플레이어 이름 길이 검증
  validateTryCount(count);         // 시도 횟수 검증 (자연수)
  validateNoDuplicateNames(list);  // 플레이어 중복 이름 검증
}

function validateCountExists(count) {
  if (count == null) throw new Error("[ERROR]");
}

function validateNameLength(list) {
  if (list.some((n) => n.length > MAX_NAME_LENGTH)) throw new Error("[ERROR]");
}

function validateTryCount(count) {
  const num = Number(count);
  if (isNaN(num) || num < 0 || !Number.isInteger(num)) throw new Error("[ERROR]");
}

function validateNoDuplicateNames(list) {
  const uniqueNames = new Set(list);
  if (uniqueNames.size !== list.length) throw new Error("[ERROR]");
}