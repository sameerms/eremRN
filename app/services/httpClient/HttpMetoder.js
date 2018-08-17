import createFetchRequest from './createFetchRequest';
import UrlFactory from './UrlFactory';
import { generateOptions } from '../../Utils';

class HttpMetoder {
    constructor (baseUrl){
        this._urlFactory = new UrlFactory(baseUrl);
    }
    get(path, query) {
        const url = this._urlFactory.create(path, query);
        return createFetchRequest(url);
    }

    put(path, payload) {
        const url = this._urlFactory.create(path);
        return createFetchRequest(url, generateOptions('PUT', payload));
    }

    post(path, payload) {
        const url = this._urlFactory.create(path);
        return createFetchRequest(url, generateOptions('POST', payload));
    }

    del(path) {
        const url = this._urlFactory.create(path);
        return createFetchRequest(url, generateOptions('DELETE'));
    }

    patch(path, payload) {
        const url = this._urlFactory.create(path);
        return createFetchRequest(url, generateOptions('PATCH', payload));
    }
}

export default HttpMetoder;