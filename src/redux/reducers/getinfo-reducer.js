import {GETINFO, CLEANINFO} from '../types';

const initialState = {
    user:{},
};

const getInfo = (state = initialState, action) => {
    switch(action.type){
        // SAVE ACTION
        case GETINFO :
            return action.payload;

        // CLEAN USER LOG
        case CLEANINFO : 
            return initialState;
        default : 
            return state
    }
}
export default getInfo;