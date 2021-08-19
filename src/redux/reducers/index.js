import {combineReducers} from 'redux';
import credentials from './credentials-reducer.js';
import action from './action-reducer.js';

const rootReducer = combineReducers({
    credentials, action
});

export default rootReducer;