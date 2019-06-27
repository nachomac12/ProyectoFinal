import { 
    GET_HABILIDADES,
    NUEVA_HABILIDAD
  } from "../actions/types";
  
  export default function(state = {}, action) {
      switch (action.type) {
        case GET_HABILIDADES:
          return { ...state, habilidades: action.payload }
        case NUEVA_HABILIDAD:
          return { ...state, nuevaHabilidad: action.payload }
        default:
          return state;
      }
    }