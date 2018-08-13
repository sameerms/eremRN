import { 
    HENT_BRUKER_INFORMASJON, 
    HENT_BRUKER_INFORMASJON_SUCCESS, 
    HENT_BRUKER_INFORMASJON_FAILURE,
    HENTER_STATISTIKK,
    HENT_BRUKER_STATISTIKK_SUCCESS,
    HENT_BRUKER_STATISTIKK_FEILET,
    TILGANG_TIL_API,
    IKKE_AUTENTISERT,
    IKKE_AUTORISERT_INNLOGGING,
    GENERELL_FEILMELDING_INNLOGGING
} from '../actionTypes';
import { BrukerService } from '../services/';
import { ikkeAutorisert, visGenerellFeilmelding } from './';
import { checkStatus, parseJSON, noStatusError} from '../Utils';

export const henterBrukerInformasjon = () => {
    return {
        type: HENT_BRUKER_INFORMASJON
    };
};

const hentBrukerInformasjonSuksess = (info) => ({
    type: HENT_BRUKER_INFORMASJON_SUCCESS,
    info
});


const hentBrukerInformasjonFeil = () => ({
    type: HENT_BRUKER_INFORMASJON_FAILURE,
});

const ikkeTilgangTilApi = () => ({
    type: TILGANG_TIL_API
});

const ikkeAutentisert = () => ({
    type: IKKE_AUTENTISERT
});

const ikkeAutorisertInnlogging = () => ({
    type: IKKE_AUTORISERT_INNLOGGING
});

const generellFeilmeldingInnlogging = () => ({
    type: GENERELL_FEILMELDING_INNLOGGING
});

export const hentBrukerInformasjon = () => {
    return (dispatch) => {
        dispatch(henterBrukerInformasjon());
        return BrukerService
            .create()
            .hentBrukerInformasjon()
            .catch((e) => {
                throw noStatusError(e, 999);
            })
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => {
                dispatch(hentBrukerInformasjonSuksess(data));  
                dispatch(henterBrukerInformasjon());
                
            })
            .catch((e) => {
                switch(e.status){
                case 999:
                    dispatch(ikkeTilgangTilApi());
                    break;
                case 401:
                    dispatch(ikkeAutentisert());
                    break;
                case 403:
                    dispatch(ikkeAutorisertInnlogging());
                    break;
                default:
                    dispatch(generellFeilmeldingInnlogging());
                }
                dispatch(hentBrukerInformasjonFeil());
                dispatch(henterBrukerInformasjon());               
                    
                
            });
    };
};

export const henterBrukerStatistikk = () => ({
    type: HENTER_STATISTIKK
});

const hentBrukerStatistikkSuksess = (statistikk) => ({
    type: HENT_BRUKER_STATISTIKK_SUCCESS,
    payload: {
        ...statistikk
    }
});


const hentBrukerStatistikkFeil = () => ({
    type: HENT_BRUKER_STATISTIKK_FEILET
});


export const hentBrukerStatistikk = () => {
    
    return dispatch => {
        dispatch(henterBrukerStatistikk());
        return BrukerService
            .create()
            .hentBrukerStatistikk()
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => {
                dispatch(hentBrukerStatistikkSuksess(data));  
                dispatch(henterBrukerStatistikk());
            })
            .catch((e) => {                
                if(e.status === 403){
                    dispatch(ikkeAutorisert(e.status, e.statusText));
                }else{
                    dispatch(visGenerellFeilmelding(e)); 
                }
                dispatch(hentBrukerStatistikkFeil());
                dispatch(henterBrukerStatistikk());
            });
    };
};
