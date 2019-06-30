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
} from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
      case INGRESAR_USUARIO:
        return { ...state, ingresoExitoso: action.payload }
      case NUEVO_PROFESIONAL:
        return { ...state, nuevoProfesional: action.payload }
      case NUEVO_EMPLEADOR:
        return { ...state, nuevoEmpleador: action.payload }
      case REGISTRAR_USUARIO:
        return { ...state, register: action.payload }
      case AUTH:
        return { ...state, usuarioDatos: action.payload }
      case BUSCAR_PROFESIONAL_POR_ID:
        return { ...state, profesional: action.payload }
      case BUSCAR_EMPLEADOR_POR_ID:
        return { ...state, empleador: action.payload }
      case CAMBIAR_FOTO_PERFIL:
        return { 
          ...state, 
          cambiarFoto: action.payload.success,
          usuarioDatos: action.payload.usuarioDatos
        }
      case CAMBIAR_EMAIL:
        return {
          ...state,
          cambiarEmail: action.payload.success,
          usuarioDatos: action.payload.usuarioDatos
        }
      case EDITAR_NOMBRE_PROFESIONAL:
        return {
          ...state,
          editarNombre: action.payload.success,
          profesional: action.payload.profesionalDatos
        }
      case EDITAR_APELLIDO_PROFESIONAL:
        return {
          ...state,
          editarApellido: action.payload.success,
          profesional: action.payload.profesionalDatos
        }
      case EDITAR_PASSWORD:
        return {
          ...state,
          editarPassword: action.payload.success,
          profesional: action.payload.profesionalDatos
        }
      case AGREGAR_HABILIDADES_PROFESIONAL:
        return {
          ...state,
          profesional: action.payload.profesionalDatos
        }
      case ELIMINAR_HABILIDAD_PROFESIONAL:
        return {
          ...state,
          profesional: action.payload.profesionalDatos
        }
      case LOGOUT:
        return {
          ...state
        }
      default:
        return state;
    }
  }