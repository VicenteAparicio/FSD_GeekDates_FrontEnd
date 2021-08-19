import {ACTION, CLEANACTION} from '../types';

const initialState = {
    action:'',
};

const actionReducer = (state = initialState, action) => {
    switch(action.type){
        // SAVE ACTION
        case ACTION :
            return action.payload;

        // CLEAN ACTION
        case CLEANACTION : 
            return initialState;

        default : 
            return state
    }
}
export default actionReducer;