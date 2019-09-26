import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listarTrabajosEmpleador, agregarPostulante, eliminarPostulante } from '../../../redux/actions/trabajo_actions';
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

  postularHandler = (idTrabajo, candidato) => {
    if (!this.state.loading) {
      const trabajos = this.props.trabajo.trabajosEmpleador;
      const dataToSubmit = {"id": idTrabajo, "candidato": candidato};
      this.props.dispatch(agregarPostulante(dataToSubmit, trabajos));
    }
  }

  despostularHandler = (idTrabajo, candidato) => {
    if (!this.state.loading) {
      const trabajos = this.props.trabajo.trabajosEmpleador;
      const dataToSubmit = {"id": idTrabajo, "candidato": candidato};
      this.props.dispatch(eliminarPostulante(dataToSubmit, trabajos));
    }
  }

  listarTrabajos = () => {
    if (!this.state.loading) {
      const trabajos = this.props.trabajo.trabajosEmpleador;
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
            postular={(idTrabajo, candidato) => this.postularHandler(idTrabajo, candidato)}
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