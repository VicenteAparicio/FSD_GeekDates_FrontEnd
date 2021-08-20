import {combineReducers} from 'redux';
import credentials from './credentials-reducer.js';
import action from './action-reducer.js';
import option from './hobbiesOpt-reducer';

const rootReducer = combineReducers({
    credentials, action, option
});

export default rootReducer;