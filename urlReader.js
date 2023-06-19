const getUrlParameters = () => {
    // Res structure: {"parameter1": "value1", "parameter2": "value2", ..., "parameterN", "valueN"}
    let parameters = {};
    
    // Access to "search" attribute on the current url to get the content after '?'
    let search = location.search;
    if (search != "") {
        // Remove '?' (the first character):
        let parametersString = search.substr(1);
        
        // Create array with all parameters and its values (parameters are separated with an '&'):
        let parametersArray = parametersString.split("&");
        
        // Check all parameters in array, separate its keys and values and save them on parameters object:
        for (let item of parametersArray) {
            let tmp = item.split("=");
            if (tmp[0] != "" && tmp[1] != "")
                parameters[tmp[0]] = tmp[1];
        }
    }
    
    return parameters;
}

export {
    getUrlParameters
};
