import ServiceBase from '../ServiceBase';
import HttpMetoder from './HttpMetoder';

class HttpClient extends HttpMetoder{
    constructor(baseUrl) {
        const _baseUrl = typeof baseUrl != 'undefined' ? baseUrl : ServiceBase.getBaseUrl();
        super(_baseUrl);
    }

    static create(baseUrl) {
        return new HttpClient(baseUrl);
    }
}

export default HttpClient;