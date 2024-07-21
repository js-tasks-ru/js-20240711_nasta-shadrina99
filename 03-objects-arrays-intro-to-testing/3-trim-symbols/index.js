/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    const newString = [];
    let count;

    if (typeof size === 'undefined') {
        return string;
    }

    if (!size) {
        return '';
    }

    for (let i = 0; i < string.length; i++) {
      if (newString[newString.length - 1] !== string[i]) {
        newString.push(string[i]);
      } else {
        count = 0;
  
        for (let j = 1; j <= size; j++) {
          if (newString[newString.length - j] === string[i]) {
            count++;
          }
        }
  
        if (count < size) {
          newString.push(string[i]);
        }
      }
    }
  
    return String(newString.join(''));
}
