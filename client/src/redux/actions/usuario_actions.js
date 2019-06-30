import axios from 'axios';

import { USUARIO_SERVER } from '../../components/Utilidades/misc';

import { 
    INGRESAR_USUARIO,
    NUEVO_PROFESIONAL,
    REGISTRAR_USUARIO,
    NUEVO_EMPLEADOR,
    AUTH,
    BUSCAR_PROFESIONAL_POR_ID,
    BUSCAR_EMPLEADOR_POR_ID,
    LOGOUT,
    CAMBIAR_FOTO_PERFIL,
    CAMBIAR_EMAIL,
    EDITAR_NOMBRE_PROFESIONAL,
    EDITAR_APELLIDO_PROFESIONAL,
    EDITAR_PASSWORD,
    AGREGAR_HABILIDADES_PROFESIONAL,
    ELIMINAR_HABILIDAD_PROFESIONAL
} from './types';

///// USUARIOS /////

export function ingresarUsuario(dataToSubmit) {
    const request = axios.post(`${USUARIO_SERVER}/ingresar`, dataToSubmit)
        .then(res => res.data);

    return {
        type: INGRESAR_USUARIO,
        payload: request
    }
}

export function nuevoProfesional(dataToSubmit) {
    const request = axios.post(`${USUARIO_SERVER}/profesionales`, dataToSubmit)
        .then(res => res.data);

        return {
            type: NUEVO_PROFESIONAL,
            payload: request
        }
}

export function nuevoEmpleador(dataToSubmit) {
    const request = axios.post(`${USUARIO_SERVER}/empleadores`, dataToSubmit)
        .then(res => res.data);

    return {
        type: NUEVO_EMPLEADOR,
        payload: request
    }
}

export function registrarUsario(dataToSubmit) {
    const request = axios.post(`${USUARIO_SERVER}/registro`, dataToSubmit)
        .then(res => res.data);

    return {
        type: REGISTRAR_USUARIO,
        payload: request
    }
}

export function auth() {
    const request = axios.get(`${USUARIO_SERVER}/auth`)
        .then(res => res.data);

    return {
        type: AUTH,
        payload: request
    }
}

export function buscarProfesionalPorID() {
    const request = axios.get(`${USUARIO_SERVER}/profesional_por_id`)
        .then(res => res.data);

    return {
        type: BUSCAR_PROFESIONAL_POR_ID,
        payload: request
    }
}

export function buscarEmpleadorPorID() {
    const request = axios.get(`${USUARIO_SERVER}/empleador_por_id`)
        .then(res => res.data);

    return {
        type: BUSCAR_EMPLEADOR_POR_ID,
        payload: request
    }
}

export function logout() {
    const request = axios.get(`${USUARIO_SERVER}/logout`)
        .then(res => res.data);

    return {
        type: LOGOUT,
        payload: request
    }
}

export function cambiarFotoPerfil(dataToSubmit, usuarioDatosExistentes) {
    const request = axios.put(`${USUARIO_SERVER}/cambiarfoto`, dataToSubmit)
        .then(res => {
            let usuarioDatos = {
                ...usuarioDatosExistentes,
                "fotoDePerfil": res.data.foto
            };
            return {
                success: res.data.success,
                usuarioDatos
            }
        })

    return {
        type: CAMBIAR_FOTO_PERFIL,
        payload: request
    }
}

export function cambiarEmail(dataToSubmit, usuarioDatosExistentes) {
    const request = axios.put(`${USUARIO_SERVER}/cambiaremail`, dataToSubmit)
        .then(res => {
            let usuarioDatos = {
                ...usuarioDatosExistentes,
                "email": res.data.email
            };
            return {
                success: res.data.success,
                usuarioDatos
            }
        })

    return {
        type: CAMBIAR_EMAIL,
        payload: request
    }
}

export function editarNombreProfesional(dataToSubmit, profesionalDatosExistente) {
    const request = axios.put(`${USUARIO_SERVER}/editar_nombre_profesional`, dataToSubmit)
        .then(res => {
            let profesionalDatos = {
                ...profesionalDatosExistente,
                "nombre": res.data.nombre
            };
            return {
                success: res.data.success,
                profesionalDatos
            }
        })
    
    return {
        type: EDITAR_NOMBRE_PROFESIONAL,
        payload: request
    }
}

export function editarApellidoProfesional(dataToSubmit, profesionalDatosExistente) {
    const request = axios.put(`${USUARIO_SERVER}/editar_apellido_profesional`, dataToSubmit)
        .then(res => {
            let profesionalDatos = {
                ...profesionalDatosExistente,
                "apellido": res.data.apellido
            };
            return {
                success: res.data.success,
                profesionalDatos
            }
        })
    
    return {
        type: EDITAR_APELLIDO_PROFESIONAL,
        payload: request
    }
}

export function cambiarPassword(dataToSubmit, usuarioDatosExistentes) {
    const request = axios.put(`${USUARIO_SERVER}/cambiarpassword`, dataToSubmit)
        .then(res => {
            let usuarioDatos = {
                ...usuarioDatosExistentes,
                "password": res.data.contraseña
            };
            return {
                success: res.data.success,
                usuarioDatos
            }
        })

    return {
        type: EDITAR_PASSWORD,
        payload: request
    }
}

export function agregarHabilidadesProfesional(dataToSubmit, profesionalDatosExistente) {
    const request = axios.put(`${USUARIO_SERVER}/agregar_habilidades`, dataToSubmit)
        .then(res => {
            let profesionalDatos = {
                ...profesionalDatosExistente,
                "habilidades": res.data
            };
            return {
                profesionalDatos
            }
        })

    return {
        type: AGREGAR_HABILIDADES_PROFESIONAL,
        payload: request
    }
} 

export function eliminarHabilidadProfesional(nombre, profesionalDatosExistente) {
    const request = axios.delete(`${USUARIO_SERVER}/eliminar_habilidad?nombre=${nombre}`)
        .then(res => {
            let profesionalDatos = {
                ...profesionalDatosExistente,
                "habilidades": res.data
            };
            return {
                profesionalDatos
            }
        })
    
    return {
        type: ELIMINAR_HABILIDAD_PROFESIONAL,
        payload: request
    }
}