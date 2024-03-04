const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  let resultArr = [];
  let isPassDuplication = false;

  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === '--discard-next') {
      i += 1;
      isPassDuplication = true;
    } else if (arr[i] === '--discard-prev') {
      if (isPassDuplication) {
        isPassDuplication = false;
        continue;
      }
      if (resultArr.length !== 0) {
        resultArr.pop();
      }
    } else if (arr[i] === '--double-next') {
      if (i !== arr.length - 1) {
        resultArr.push(arr[i + 1]);
      }
    } else if (arr[i] === '--double-prev') {
      if (isPassDuplication) {
        isPassDuplication = false;
        continue;
      }
      if (resultArr.length !== 0) {
        resultArr.push(resultArr[resultArr.length - 1]);
      }
    } else {
      resultArr.push(arr[i]);
    }
  }
  
  return resultArr;
}

module.exports = {
  transform
};
