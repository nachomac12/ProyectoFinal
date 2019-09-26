import {
    AGREGAR_TRABAJO,
    TRABAJOS_POR_EMPLEADOR,
    AGREGAR_POSTULANTE,
    ELIMINAR_POSTULANTE
} from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case AGREGAR_TRABAJO:
            return {
                ...state,
                nuevoTrabajo: action.payload
            }
        case TRABAJOS_POR_EMPLEADOR:
            return {
                ...state,
                trabajosEmpleador: action.payload
            }
        case AGREGAR_POSTULANTE:
            return {
                ...state,
                trabajosEmpleador: action.payload
            }
        case ELIMINAR_POSTULANTE:
            return {
                ...state,
                trabajosEmpleador: action.payload
            }
        default:
            return state;
    }
}