import { TRABAJO_SERVER } from '../../components/Utilidades/misc';
import axios from 'axios';
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

export function agregarTrabajo(dataToSubmit) {
    const request = axios.post(`${TRABAJO_SERVER}/trabajo`, dataToSubmit)
        .then(res => res.data);

    return {
        type: AGREGAR_TRABAJO,
        payload: request
    }
}

export function listarTrabajosEmpleador() {
    const request = axios.get(`${TRABAJO_SERVER}/trabajos_por_empleador`)
        .then(res => res.data);

    return {
        type: TRABAJOS_POR_EMPLEADOR,
        payload: request
    }
}

export function agregarPostulante(dataToSubmit, trabajos) {
    const request = axios.put(`${TRABAJO_SERVER}/postular`, dataToSubmit)
        .then(res => {
            return trabajos.map(trabajo => {
                if (trabajo._id === res.data._id) {
                    return trabajo = res.data;
                }
                return trabajo;
            })
        });

    return {
        type: AGREGAR_POSTULANTE,
        payload: request
    }
}

export function eliminarPostulante(dataToSubmit, trabajos) {
    const request = axios.put(`${TRABAJO_SERVER}/despostular`, dataToSubmit)
        .then(res => {
            return trabajos.map(trabajo => {
                if (trabajo._id === res.data._id) {
                    return trabajo = res.data;
                }
                return trabajo;
            })
        });
        
    return {
        type: ELIMINAR_POSTULANTE,
        payload: request
    }
}

export function listarNotificacionesUsuario() {
    const request = axios.get(`${TRABAJO_SERVER}/notificaciones_usuario`)
        .then(res => res.data);

    return {
        type: LISTAR_NOTIFICACIONES_USUARIO,
        payload: request
    }
}

export function crearNotificacion(notificaciones, dataToSubmit) {
    const request = axios.post(`${TRABAJO_SERVER}/notificacion`, dataToSubmit)
        .then(res => notificaciones.push(res.data));

    return {
        type: CREAR_NOTIFICACION,
        payload: request
    }
}

export function borrarNotificacion(notificaciones, dataToSubmit) {
    const request = axios.put(`${TRABAJO_SERVER}/notificacion`, dataToSubmit)
        .then(res => {
            return notificaciones.filter(notif => notif._id !== res.data._id);
        })
    
    return {
        type: BORRAR_NOTIFICACION,
        payload: request
    }
}

export function verNotificacion(notificaciones, dataToSubmit) {
    const request = axios.put(`${TRABAJO_SERVER}/notificacion_vista`, dataToSubmit)
        .then(res => {
            return notificaciones.map(notif => {
                if (notif._id === res.data._id) {
                    return notif = res.data;
                }
                return notif;
            })
        })

    return {
        type: VER_NOTIFICACION,
        payload: request
    }
}