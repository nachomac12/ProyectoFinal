import { combineReducers } from 'redux';
import usuario from './usuario_reducer';
import habilidad from './habilidad_reducer';
import trabajo from './trabajo_reducer';

const rootReducer = combineReducers({
    usuario,
    habilidad,
    trabajo
});

export default rootReducer;