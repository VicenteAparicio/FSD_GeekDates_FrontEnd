import {CLEANHOBBIES, GETHOBBIES} from '../types';

const initialState = {
    hobbies:{},
};

const getHobbies = (state = initialState, action) => {
    switch(action.type){
        // SAVE ACTION
        case GETHOBBIES :
            return action.payload;

        // CLEAN USER LOG
        case CLEANHOBBIES : 
            return initialState;

        default : 
            return state
    }
}
export default getHobbies;