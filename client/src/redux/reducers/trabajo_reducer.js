import {
    AGREGAR_TRABAJO,
    TRABAJOS_POR_EMPLEADOR,
    AGREGAR_POSTULANTE,
    ELIMINAR_POSTULANTE,
    LISTAR_NOTIFICACIONES_USUARIO,
    CREAR_NOTIFICACION,
    BORRAR_NOTIFICACION,
    VER_NOTIFICACION
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
        case LISTAR_NOTIFICACIONES_USUARIO:
            return {
                ...state,
                notificaciones: action.payload
            }
        case CREAR_NOTIFICACION:
            return {
                ...state,
                notificaciones: action.payload
            }
        case BORRAR_NOTIFICACION:
            return {
                ...state,
                notificaciones: action.payload
            }
        case VER_NOTIFICACION:
            return {
                ...state,
                notificaciones: action.payload
            }
        default:
            return state;
    }
}