import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  listarTrabajosEmpleador, 
  agregarPostulante, 
  eliminarPostulante,
  crearNotificacion,
  borrarNotificacion
} from '../../../redux/actions/trabajo_actions';
import { Dialog, DialogTitle, DialogContent, CircularProgress } from '@material-ui/core';
import TrabajoPostular from './trabajo_postular';
import axios from 'axios';
import { Link } from 'react-router-dom';

class PostularProfesional extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    this.props.dispatch(listarTrabajosEmpleador())
      .then(() => {
        if (this.props.trabajo.trabajosEmpleador) {
          this.setState({loading: false})
        }
      })
  }

  enviarNotif = (idTrabajo, idDestino, tituloTrabajo) => {
    const idCreador = this.props.usuario.usuarioDatos.id;
    const nombreEmpresa = this.props.usuario.usuarioDatos.nombre + " " + this.props.usuario.usuarioDatos.apellido;
    axios.get(`/api/usuarios/get_usuario?idUsuario=${idDestino}`)
      .then(res => {
        const dataToSubmit = {
          "titulo": `Has sido postulado a ${tituloTrabajo} por ${nombreEmpresa}`,
          "mensaje": `Hola ${res.data.nombre}, me gustaría contactarme contigo ya que tu perfil me ha resultado interesante. Saludos cordiales!`,
          "creador": idCreador,
          "destino": idDestino,
          "trabajoAsociado": idTrabajo
        }
        this.props.dispatch(crearNotificacion([], dataToSubmit));
      })
  }

  cancelarNotif = (idTrabajo, idDestino) => {
    const idCreador = this.props.usuario.usuarioDatos.id;
    const dataToSubmit = {
      "creadorID": idCreador,
      "usuarioID": idDestino,
      "trabajoID": idTrabajo
    }
    this.props.dispatch(borrarNotificacion([], dataToSubmit));
  }

  postularHandler = (idTrabajo, candidato, tituloTrabajo) => {
    if (!this.state.loading) {
      const trabajos = this.props.trabajo.trabajosEmpleador;
      const dataToSubmit = {"id": idTrabajo, "candidato": candidato};
      this.props.dispatch(agregarPostulante(dataToSubmit, trabajos))
        .then(() => this.enviarNotif(idTrabajo, candidato, tituloTrabajo));
    }
  }

  despostularHandler = (idTrabajo, candidato) => {
    if (!this.state.loading) {
      const trabajos = this.props.trabajo.trabajosEmpleador;
      const dataToSubmit = {"id": idTrabajo, "candidato": candidato};
      this.props.dispatch(eliminarPostulante(dataToSubmit, trabajos))
        .then(() => this.cancelarNotif(idTrabajo, candidato));
    }
  }

  listarTrabajos = () => {
    if (!this.state.loading) {
      const trabajos = this.props.trabajo.trabajosEmpleador;
      if (trabajos.length === 0) return (
        <h5>Aún no has creado ningún trabajo. Para crear uno haz <Link to="/crear_empleo">click aquí</Link>.</h5>
      )
      const usuarioID = this.props.match.params.id;
      return trabajos.map(trabajo => {
        const postulado = axios.get(`/api/trabajos/esta_postulado?id=${trabajo._id}&candidato=${usuarioID}`)
          .then(async res => await res.data.postulado);
        return (
          <TrabajoPostular
            key={trabajo._id}
            idTrabajo={trabajo._id}
            usuarioID={usuarioID}
            titulo={trabajo.titulo}
            postular={(idTrabajo, candidato) => this.postularHandler(idTrabajo, candidato, trabajo.titulo)}
            despostular={(idTrabajo, candidato) => this.despostularHandler(idTrabajo, candidato)}
            postulado={postulado}
          />
        )
      })
    }
  }

  render() {
    return (
      <div style={{padding: 50, textAlign: 'center'}}>
        {this.listarTrabajos()}
        <div style={{marginTop: 50}}>
          <Link 
            className="btn btn-lg btn-outline-info p-4" 
            to="/buscar_profesionales"
          >Seguir buscando profesionales</Link>
        </div>
        <div>
          <Dialog open={this.state.loading}>
            <DialogTitle>Cargando...</DialogTitle>
            <DialogContent>
              <CircularProgress thickness={7} style={{left:'30%', position:'relative', color: '#2196F3'}} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    trabajo: state.trabajo
  }
}

export default connect(mapStateToProps)(PostularProfesional);