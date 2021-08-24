import {HOBBIEOPTION, HOBBIEOPTIONCLEAN} from '../types';

const initialState = {
    name:'',
    value:''
};

const hobbieOption = (state = initialState, action) => {
    switch(action.type){
        // SAVE ACTION
        case HOBBIEOPTION :
            return action.payload;

        // CLEAN USER LOG
        case HOBBIEOPTIONCLEAN : 
            return initialState;
        default : 
            return state
    }
}
export default hobbieOption;