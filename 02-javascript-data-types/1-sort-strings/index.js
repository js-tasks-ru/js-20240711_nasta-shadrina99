/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

function ascSorting(a, b) {
    const result = a.localeCompare(b, {sensitivity: "base"});
    return a.toLowerCase() === b.toLowerCase() && result > 0 ? -1 : result;
}

export function sortStrings(arr, param = 'asc') {
    let result;
    const newArray = [...arr];

    const sorting = newArray.sort((a, b)=> ascSorting(a, b));
    
    if (param === 'asc') {
        result = sorting;
    }

    if (param === 'desc') {
        result = sorting.reverse();
    }

    return result;
}
