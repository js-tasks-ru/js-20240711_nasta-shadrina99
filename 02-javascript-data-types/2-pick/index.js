/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    const newObj = {};
    
    fields.map(field => {
        Object.keys(obj).find(item => {
            if (item === field) {
                newObj[field] = obj[item];
            }
        });
    });

    return newObj;
};
