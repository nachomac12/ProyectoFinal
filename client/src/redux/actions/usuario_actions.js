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
    CAMBIAR_NOMBRE,
    CAMBIAR_APELLIDO,
    CAMBIAR_DESCRIPCION,
    CAMBIAR_TELEFONO,
    AGREGAR_HABILIDADES_PROFESIONAL,
    ELIMINAR_HABILIDAD_PROFESIONAL,
    CREAR_DOMICILIO,
    CAMBIAR_DOMICILIO,
    AGREGAR_DOMICILIO_USUARIO,
    GET_DOMICILIO
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

export function cambiarNombre(dataToSubmit, usuarioDatosExistentes) {
    const request = axios.put(`${USUARIO_SERVER}/cambiarnombre`, dataToSubmit)
        .then(res => {
            let usuarioDatos = {
                ...usuarioDatosExistentes,
                "nombre": res.data.nombre
            };
            return {
                success: res.data.success,
                usuarioDatos
            }
        })

    return {
        type: CAMBIAR_NOMBRE,
        payload: request
    }
}

export function cambiarApellido(dataToSubmit, usuarioDatosExistentes) {
    const request = axios.put(`${USUARIO_SERVER}/cambiarapellido`, dataToSubmit)
        .then(res => {
            let usuarioDatos = {
                ...usuarioDatosExistentes,
                "apellido": res.data.apellido
            };
            return {
                success: res.data.success,
                usuarioDatos
            }
        })

    return {
        type: CAMBIAR_APELLIDO,
        payload: request
    }
}

export function cambiarDescripcion(dataToSubmit, usuarioDatosExistentes) {
    const request = axios.put(`${USUARIO_SERVER}/cambiardescripcion`, dataToSubmit)
        .then(res => {
            let usuarioDatos = {
                ...usuarioDatosExistentes,
                "descripcion": res.data.descripcion
            };
            return {
                success: res.data.success,
                usuarioDatos
            }
        })

    return {
        type: CAMBIAR_DESCRIPCION,
        payload: request
    }
}

export function cambiarTelefono(dataToSubmit, usuarioDatosExistentes) {
    const request = axios.put(`${USUARIO_SERVER}/cambiartelefono`, dataToSubmit)
        .then(res => {
            let usuarioDatos = {
                ...usuarioDatosExistentes,
                "telefono": res.data.telefono
            };
            return {
                success: res.data.success,
                usuarioDatos
            }
        })

    return {
        type: CAMBIAR_TELEFONO,
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

export function crearDomicilio(dataToSubmit) {
    const request = axios.post(`${USUARIO_SERVER}/domicilio`, dataToSubmit)
        .then(res => res.data)

    return {
        type: CREAR_DOMICILIO,
        payload: request
    }
}

export function cambiarDomicilio(dataToSubmit) {
    const request = axios.put(`${USUARIO_SERVER}/domicilio`, dataToSubmit)
        .then(res => res.data)

    return {
        type: CAMBIAR_DOMICILIO,
        payload: request
    }
}

export function agregarDomicilioUsuario(dataToSubmit, usuarioDatosExistentes) {
    const request = axios.put(`${USUARIO_SERVER}/agregardomicilio`, dataToSubmit)
    .then(res => {
        let usuarioDatos = {
            ...usuarioDatosExistentes,
            "domicilio": res.data.domicilio
        };
        return {
            success: res.data.success,
            usuarioDatos
        }
    })

    return {
        type: AGREGAR_DOMICILIO_USUARIO,
        payload: request
    }
}

export function getDomicilio() {
    const request = axios.get(`${USUARIO_SERVER}/domicilio`)
        .then(res => res.data)
    return {
        type: GET_DOMICILIO,
        payload: request
    }
}