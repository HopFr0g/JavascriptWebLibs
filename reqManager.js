const sendPost = (url, body, resType) => {
    return new Promise(async (resolve, reject) => {
        try {const settings = {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            };
            let req = await fetch(url, settings);
            let res = await req[resType]();
            return resolve(res);
        } catch (e) {
            return reject(e);
        }
    });
}

const sendGet = (url, resType) => {
    return new Promise(async (resolve, reject) => {
        try {
            let req = await fetch(url);
            let res = await req[resType]();
            return resolve(res);
        } catch (e) {
            return reject(e);
        }
    });
}

export {sendPost, sendGet};