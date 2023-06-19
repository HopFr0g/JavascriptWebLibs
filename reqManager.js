const sendHttpRequest = (method, url, body, resType) => {
    return new Promise(async (resolve, reject) => {
        try {
            const settings = {
                method
            };
            
            if (body != undefined && body != null) {
                settings["body"] = JSON.stringify(body);
                settings["headers"] = {
                    "content-type": "application/json"
                };
            }
            
            let req = await fetch(url, settings);
            let res = await req[resType]();
            
            return resolve(res);
        } catch (e) {
            console.error(e);
            return reject(e);
        }
    });
}

export {
    sendHttpRequest
};
