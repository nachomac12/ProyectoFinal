import { TRABAJO_SERVER } from '../../components/Utilidades/misc';
import axios from 'axios';
import {
    AGREGAR_TRABAJO,
    TRABAJOS_POR_EMPLEADOR,
    AGREGAR_POSTULANTE,
    ELIMINAR_POSTULANTE
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