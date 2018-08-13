import {  
    IKKE_AUTORISERT_INNLOGGING,
    TILGANG_TIL_API,
    IKKE_AUTENTISERT, 
    HENT_BRUKER_INFORMASJON, 
    HENT_BRUKER_INFORMASJON_SUCCESS, 
    HENT_BRUKER_INFORMASJON_FAILURE, 
    HENTER_STATISTIKK,
    HENT_BRUKER_STATISTIKK_SUCCESS,
    HENT_BRUKER_STATISTIKK_FEILET,
    GENERELL_FEILMELDING_INNLOGGING
} from '../actionTypes';

export const initialState = {
    roller: [],
    bruker: '',
    navn: '',
    henterInfo: false,
    statistikk: {
        henterStatistikk: false,
        hentBrukerStatistikkFeilet: false,
        
    },
    tilgang: {
        autorisert: false,
        autentisert: false,
        tilgangTilApi: false
    },
    rettigheter: {}
};

const brukerReducer = (state = initialState, action) => { 
    switch(action.type) {

    case HENT_BRUKER_INFORMASJON:
        return {
            ...state,
            henterInfo: !state.henterInfo
        };

    case IKKE_AUTORISERT_INNLOGGING: 
        return {
            ...state,
            tilgang: {
                ...state.tilgang,
                autorisert: false
            }
        };
    case GENERELL_FEILMELDING_INNLOGGING:
    case TILGANG_TIL_API:
        return {
            ...state,
            tilgang: {
                ...state.tilgang,
                tilgangTilElsaApi: false
            }
        };
    case IKKE_AUTENTISERT:
        return {
            ...state,
            tilgang: {
                ...state.tilgang,
                autentisert: false
            }
        };

    case HENT_BRUKER_INFORMASJON_SUCCESS:
        return {
            ...state,
            roller: action.info.Roller,
            bruker: action.info.Bruker,
            navn: action.info.Navn,
            tilgang: {
                ...state.tilgang,
                autentisert: true,
                tilgangTilApi: true,
                autorisert: true
            },            
            
        };

    case HENT_BRUKER_INFORMASJON_FAILURE: 
        return state;
    
    case HENTER_STATISTIKK:     
        return {
            ...state,
            statistikk: {
                ...state.statistikk,
                henterStatistikk: !state.statistikk.henterStatistikk
            }
            
        };

    case HENT_BRUKER_STATISTIKK_FEILET:
        return {
            ...state,
            statistikk: {
                ...state.statistikk,
                hentBrukerStatistikkFeilet: true                
            }
        };    

    case HENT_BRUKER_STATISTIKK_SUCCESS: 
        return {
            ...state,
            statistikk: {
                ...state.statistikk,
                ...action.payload,
                hentBrukerStatistikkFeilet: false
            }
        };

    default:
        return state;
    }
};

export default brukerReducer;

export const getBrukerState = (state) => (state);

export const hentBrukernavn = (state) => {
    return {
        brukernavn: state.bruker
    };
};


export const hentTilganger = (state) => {
    let harTilgangTilPortalen = true;
    for (const key in state.tilgang) {
        if (state.tilgang.hasOwnProperty(key)) {
            if(!state.tilgang[key]){
                harTilgangTilPortalen = false;            
            }
        }
    }
    return {
        ...state.tilgang,
        henterInfo: state.henterInfo,
        tilgangTilPortalen: harTilgangTilPortalen
    };
};



export const hentBrukerAutorisering = (state) => {
    return {
        ...state.tilgang
    };
};

export const hentBrukerTilPopout = (state) => {
    return {
        brukernavn: state.navn
    };
};

