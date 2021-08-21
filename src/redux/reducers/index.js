import {combineReducers} from 'redux';
import credentials from './credentials-reducer.js';
import action from './action-reducer.js';
import option from './hobbiesOpt-reducer';
import getinfo from './getinfo-reducer';

const rootReducer = combineReducers({
    credentials, action, option, getinfo
});

export default rootReducer;