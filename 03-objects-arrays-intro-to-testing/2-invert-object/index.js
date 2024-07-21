/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
    try {
        const entries = Object.entries(obj);
        const reverseEntries = {};

        for (const pair of entries) {
        pair.reverse();
        reverseEntries[pair[0]] = pair[pair.length - 1];
        }
        
        return reverseEntries;
    } catch {
        return;
    }
}
