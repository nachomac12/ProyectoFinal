import { combineReducers } from 'redux';
import usuario from './usuario_reducer';

const rootReducer = combineReducers({
    usuario
});

export default rootReducer;