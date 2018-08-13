export const parseDate = (datoObj = new Date(), delimiter = '/') => {
    if (!(datoObj instanceof Date) || isNaN(datoObj.getTime())) {
        throw new Error('Sjekk at innsendt object er et Date() objekt');
    }
    if(typeof delimiter !== 'string'){
        throw new Error('Separator må være av typen string');
    }
    try{
        let dd;
        let mm;
        let yyyy;
        dd = datoObj.getDate();
        mm = `${datoObj.getMonth() + 1}`; 
        yyyy = datoObj.getFullYear();
        if(dd<10){
            dd = '0' + dd;        
        } 
        if(mm<10){
            mm = '0' + mm;
        }

        
        return `${dd}${delimiter}${mm}${delimiter}${yyyy}`;
    }catch(e){
        throw new Error(`${e.message} \n Sjekk at innsendt object er et Date() objekt`);
    }
};

export const getToday = (delimiter = '/') => {
    return parseDate(new Date(), delimiter);
};

export const notFoundResponse = (response) => new Promise((resolve, reject) => {
    resolve({
        Feilmeldinger: [
            'Ressursen du leter etter finnes ikke på serveren',
            response.url,
                
        ],
        Tidspunkt: getToday(),
        Tittel: response.statusText,
        CorrelationId: null

    });
    reject('Rejected'); 
});

const error = (response, status = false) => {
    const error = new Error(response.statusText || 'Ukjent feil');
    status === false ? error.status = response.status : error.status = status;
    error.statusText = response.statusText;
    error.response = response;
    return error;
};

const notFoundError = (response) => {
    const error = new Error(response.statusText);
    error.status = response.status;
    error.statusText = response.statusText;
    error.response = {
        json: () => notFoundResponse(response)
    };
    return error;
};

export const noStatusError = (e, status) => {
    const error = new Error(e.message);
    error.status = status;
    error.statusText = e.message;
    error.stack = e.stack;
    error.type = 'noStatusError';
    error.response = {
        json: () => (e)
    };
    return error;
};

export const noJsonError = (e) => {
    const error = new Error(e.message);
    error.status = 998;
    error.statusText = e.message;
    error.stack = e.stack;
    error.type = 'noJsonError';
    error.response = {
        json: () => (e)
    };
    return error;
};

export const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        throw error(response);
    }
};


export const parseJSON = (response) => {
    return response.json()
        .then(json => {
            return json;
        })
        .catch( e =>  {
            throw new noJsonError(e);
        }); 
};

export const noContent = (response) => {
    if(response.status === 204){
        throw notFoundError(response);
    }
    return response;
};