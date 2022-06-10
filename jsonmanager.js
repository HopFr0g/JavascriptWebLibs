const fs = require("fs");

const readFile = dir => {
    // Receives a directory "dir" of a json file containing an array of objects.
    // Returns a promise that resolves on the array of json objects.
    return new Promise((resolve, reject) => {
        fs.readFile(dir, (error, data) => {
            if (error)
                return reject(error);
            let jsonArray;
            try {
                jsonArray = JSON.parse(data);
            }
            catch (error) {
                return reject("Invalid file: Error parsing file content to JSON.");
            }
            if (Array.isArray(jsonArray))
                return resolve(jsonArray);
            return reject("Invalid file: The directory should contain a JSON file with an array of objects inside it.");
        });
    });
}

const writeFile = (dir, serializedContent) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(dir, serializedContent, (error) => {
            if (error)
                return reject(error);
            return resolve("File writed successfully.")
        });
    });
}

const findObject = (dir, idKey, idValue, multipleMatches) => {
    // Receives a directory "dir" of a .json file containing an array of json objects.
    // Will search for an object that has a key "idKey" whose value is "idValue".
    // If multipleMatches parameter is true, returns a promise that resolves to an array with all objects founded.
    // If multipleMatches parameter is false or undefined (default), returns a promise that resolves to the first found object.
    // If no object is found, returns a promise that resolves on undefined. 
    return new Promise(async (resolve, reject) => {
        let matches = [];
        let jsonArray;
        try {
            jsonArray = await readFile(dir);
        }
        catch (error) {
            return reject(error);
        }
        for (let json of jsonArray) {
            if (json[idKey] == idValue) {
                if (!multipleMatches)
                    return resolve(json);
                matches.push(json);
            }
        }
        if (!multipleMatches)
            return resolve(undefined);
        return resolve(matches);
    });
}

const editObject = (dir, idKey, idValue, editKey, editValue, multipleMatches) => {
    // Receives a directory "dir" of a .json file containing an array of json objects.
    // Will search for an object that has a key "idName" whose value is "idValue".
    // When the object is found, replaces the value of the "keyName" with the new "keyValue" given.
    // If multipleMatches is false or undefined (default), will only modify the first found object.
    // It will return a promise that resolves on the object (multipleMatches false or undefined)
    // or an array with all the objects (multipleMatches true) modified.
    return new Promise(async (resolve, reject) => {
        let matches = [];
        let jsonArray;
        try {
            jsonArray = await readFile(dir);
        }
        catch (error) {
            return reject(error);
        }    
        for (let json of jsonArray) {
            if (json[idKey] == idValue) {
                matches.push(json);
                json[editKey] = editValue;
                if (!multipleMatches)
                    break;
            }
        }
        try {
            await writeFile(dir, JSON.stringify(jsonArray));
        }
        catch (error) {
            return reject(error);
        }
        if (!multipleMatches)
            return resolve(matches[0]);
        return resolve(matches);
    });
}

const removeObject = (dir, idKey, idValue, multipleMatches) => {
    // Receives a directory "dir" of a .json file containing an array of json objects.
    // It will search for an object with the key "idKey" and the value "idValue".
    // If multipleMatches is false or undefined, will only delete the first found object,
    // if multipleMatches is true, will delete all found objects.
    // It will return a promise that resolves on the object (multipleMatches false or undefined)
    // or an array with all the objects (multipleMatches true) deleted.
    return new Promise(async (resolve, reject) => {
        let matches = [];
        let jsonArray;
        try {
            jsonArray = await readFile(dir);
        }
        catch (error) {
            return reject(error);
        }
        for (let json of jsonArray) {
            if (json[idKey] == idValue) {
                matches.push(json);
                if (!multipleMatches)
                    break;
            }
        }
        for (let json of matches) {
            jsonArray.splice(jsonArray.indexOf(json), 1);
        }
        try {
            await writeFile(dir, JSON.stringify(jsonArray));
        }
        catch (error) {
            return reject(error);
        }
        if (!multipleMatches)
            return resolve(matches[0]);
        return resolve(matches);
    });
}

const addObject = (dir, jsonObject) => {
    // Receives a directory "dir" of a .json file containing an array of json objects.
    // Returns a promise that resolves on true if the add process is successful.
    return new Promise(async (resolve, reject) => {
        try {
            let jsonArray = await readFile(dir);
            jsonArray.push(jsonObject);
            await writeFile(dir, JSON.stringify(jsonArray));
            return resolve(true);
        }
        catch (error) {
            return reject(error);
        }
    });
}

const sort = (dir, idKey) => {
    // Receives a directory "dir" of a .json file containing an array of json objects.
    // Sorts objects incrementally based on the value of the idKey field.
    // Returns a promise that resolves on true if the sort process is successful.
    return new Promise(async (resolve, reject) => {
        try {
            let jsonArray = await readFile(dir);
            jsonArray.sort((a, b) => {
                if (a[idKey] < b[idKey])
                    return -1;
                if (a[idKey] > b[idKey])
                    return 1;
                return 0;
            });
            await writeFile(dir, JSON.stringify(jsonArray));
            return resolve(true);
        }
        catch (error) {
            return reject(error);
        }
    });
}

module.exports = {findObject, editObject, removeObject, addObject, sort};