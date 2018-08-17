import { lagQueryString } from '../../Utils/URLHelper';

class UrlFactory {
    constructor(baseUrl = '') {
        this._baseUrl = baseUrl.replace(/\/+$/, '');
    }

    create(path = '', queryObj) {
        const url = path === ''
            ? this._baseUrl
            : `${this._baseUrl}/${path.replace(/^\/+/, '')}`;

        const queryString = queryObj
            ? `?${lagQueryString(queryObj)}`
            : '';

        return `${url}${queryString}`;
    }
}

export default UrlFactory;