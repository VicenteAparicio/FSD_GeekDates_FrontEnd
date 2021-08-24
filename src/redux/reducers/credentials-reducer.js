import {LOGIN, LOGOUT} from '../types';

const initialState = {
    user : {},
    token : ''
};

const credentialsReducer = (state = initialState, action) => {
    switch(action.type){
        // AD USER LOG
        case LOGIN :
            return action.payload;

        // CLEAN USER LOG
        case LOGOUT : 
            return initialState;

        default : 
            return state
    }
}
export default credentialsReducer;