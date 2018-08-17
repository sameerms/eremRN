export const lagQueryString = (obj, prefix) => {
    const str = [];
    for(const property in obj) {
        if (obj.hasOwnProperty(property)) {
            const key = prefix ? `${prefix}[${property}]` : property;
            const value = obj[property];
            if (value && value !== 'undefined') {
                if(Array.isArray(value)){
                    if (value.length > 0) {
                        str.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`);
                    }
                }else{
                    let tempStr = '';
                    if (value.constructor === Object) {
                        if (Object.keys(value).length !== 0) {
                            tempStr = lagQueryString(value, key);
                        }
                    } else {
                        tempStr = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
                    }
                    if (tempStr) {
                        str.push(tempStr);
                    }
                }
            }
        }
    }
    return `${str.join('&')}`;
};

export const parseQueryString = () => {
    let search = location.search;
    const retObj = {};
    if (!search) {
        return retObj;
    }
    if (search[0] === '?') {
        search = search.substr(1, search.length);
    }

    const parameters = search.split('&');
    parameters.forEach(parameter => {
        const splitParam = parameter.split('=');
        const prop = splitParam[0];
        const val = splitParam[1];
        if (prop != null && val != null) {
            if (isNaN(val)) {
                retObj[prop] = val;
            } else {
                retObj[prop] = +val;
            }
        }
    });
    return retObj;
};