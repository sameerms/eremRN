const defaultOptions = {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'pragma': 'no-cache',
        'cache-control': 'no-cache'
    }
};

const createFetchRequest = (url, options) => {
    const requestOptions = Object.assign({}, defaultOptions, options);
    return fetch(url, requestOptions);
};

export default createFetchRequest;