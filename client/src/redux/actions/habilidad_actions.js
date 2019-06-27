import axios from 'axios';

import { HABILIDAD_SERVER } from '../../components/Utilidades/misc';

import {
    GET_HABILIDADES,
    NUEVA_HABILIDAD
} from './types';

export function getHabilidades(profesion) {
    const request = axios.get(`${HABILIDAD_SERVER}/get_habilidades?profesion=${profesion}`)
        .then(res => res.data)

    return {
        type: GET_HABILIDADES,
        payload: request
    }
}

export function nuevaHabilidad(dataToSubmit) {
    const request = axios.get(`${HABILIDAD_SERVER}/agregar_habilidad`, dataToSubmit)
        .then(res => res.data);

    return {
        type: NUEVA_HABILIDAD,
        payload: request
    }
}