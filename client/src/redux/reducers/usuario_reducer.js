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
  GET_DOMICILIO,
  AGREGAR_IDIOMAS_PROFESIONAL,
  ELIMINAR_IDIOMA_PROFESIONAL,
  AGREGAR_EDUCACION_PROFESIONAL,
  ELIMINAR_EDUCACION_PROFESIONAL
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case INGRESAR_USUARIO:
      return { ...state, ingresoExitoso: action.payload };
    case NUEVO_PROFESIONAL:
      return { ...state, nuevoProfesional: action.payload };
    case NUEVO_EMPLEADOR:
      return { ...state, nuevoEmpleador: action.payload };
    case REGISTRAR_USUARIO:
      return { ...state, register: action.payload };
    case AUTH:
      return { ...state, usuarioDatos: action.payload };
    case BUSCAR_PROFESIONAL_POR_ID:
      return { ...state, profesional: action.payload };
    case BUSCAR_EMPLEADOR_POR_ID:
      return { ...state, empleador: action.payload };
    case CAMBIAR_FOTO_PERFIL:
      return {
        ...state,
        cambiarFoto: action.payload.success,
        usuarioDatos: action.payload.usuarioDatos
      };
    case CAMBIAR_EMAIL:
      return {
        ...state,
        cambiarEmail: action.payload.success,
        usuarioDatos: action.payload.usuarioDatos
      };
    case CAMBIAR_NOMBRE:
      return {
        ...state,
        cambiarNombre: action.payload.success,
        usuarioDatos: action.payload.usuarioDatos
      };
    case CAMBIAR_APELLIDO:
      return {
        ...state,
        cambiarApellido: action.payload.success,
        usuarioDatos: action.payload.usuarioDatos
      };
    case CAMBIAR_DESCRIPCION:
      return {
        ...state,
        cambiarDescripcion: action.payload.success,
        usuarioDatos: action.payload.usuarioDatos
      };
    case CAMBIAR_TELEFONO:
      return {
        ...state,
        cambiarTelefono: action.payload.success,
        usuarioDatos: action.payload.usuarioDatos
      };
    case AGREGAR_HABILIDADES_PROFESIONAL:
      return {
        ...state,
        profesional: action.payload.profesionalDatos
      };
    case ELIMINAR_HABILIDAD_PROFESIONAL:
      return {
        ...state,
        profesional: action.payload.profesionalDatos
      };
    case AGREGAR_IDIOMAS_PROFESIONAL: 
      return {
        ...state,
        profesional: action.payload.profesionalDatos
      }
    case ELIMINAR_IDIOMA_PROFESIONAL:
      return {
        ...state,
        profesional: action.payload.profesionalDatos
      }
    case AGREGAR_EDUCACION_PROFESIONAL:
      return {
        ...state,
        profesional: action.payload.profesionalDatos
      }
    case ELIMINAR_EDUCACION_PROFESIONAL:
      return {
        ...state,
        profesional: action.payload.profesionalDatos
      }
    case AGREGAR_DOMICILIO_USUARIO:
      return {
        ...state,
        nuevoDomicilio: action.payload.success,
        usuarioDatos: action.payload.usuarioDatos
      };
    case GET_DOMICILIO:
      return { ...state, domicilio: action.payload };
    case CREAR_DOMICILIO:
      return { ...state, domicilio: action.payload };
    case CAMBIAR_DOMICILIO:
      return { ...state, domicilio: action.payload };
    case LOGOUT:
      return { ...state };
    default:
      return state;
  }
}
