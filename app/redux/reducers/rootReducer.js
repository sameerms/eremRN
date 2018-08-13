import { combineReducers } from 'redux';
import { 
    config,
    
} from './';

import bruker, * as fraBruker from './brukerReducer';


const rootReducer = combineReducers({
    config,
    bruker
    
});


////Bruker
export const getBrukerState = (state) => 
    fraBruker.getBrukerState(state.bruker);

export const getBrukerStatistikk = (state) => 
    fraBruker.getBrukerStatistikk(state.bruker);



export const hentTilganger = (state) => 
    fraBruker.hentTilganger(state.bruker);

export const hentBrukernavn = (state) => 
    fraBruker.hentBrukernavn(state.bruker);

export const hentBrukerTilPopout = (state) =>
    fraBruker.hentBrukerTilPopout(state.bruker);



    

    
export default rootReducer;
