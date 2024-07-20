/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const propertiesArray = path.split('.');

    return (obj) => {
        let currentPath = obj;

        for (let i = 0; i < propertiesArray.length; i++) {
            if (typeof currentPath === 'undefined') {
                return;
            }

            if (obj.hasOwnProperty(propertiesArray[i])) {
                returncurrentPath = currentPath[propertiesArray[i]];
            } else return;
        }

        return currentPath;
    };
}
