import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDomicilio } from '../../../redux/actions/usuario_actions';
import UsuarioCard from './Usuario_Card';
import EditarDatos from './editar_datos';
import SeleccionarHabilidades from './seleccionar_habilidades';
import DomicilioUsuario from './domicilio_usuario';

class Perfil extends Component {
  componentDidMount() {
    this.props.dispatch(getDomicilio())
  }

  render() {
    const usuario = this.props.usuario.usuarioDatos;
    const profesional = this.props.usuario.profesional;
    const empleador = this.props.usuario.empleador;
    const domicilio = this.props.usuario.domicilio;
    console.log(domicilio)
    return (
      <div className="row justify-content-center" style={{margin: 10}}>
        <div className="col-md-4">
          <UsuarioCard 
            datosUsuario={usuario}
            profesional={profesional}
            empleador={empleador}
          />
        </div>
        <div className="col-md-5">
          {usuario.esProfesional 
            ? <div className="mb-2"><SeleccionarHabilidades profesional={profesional}/></div>
            : null
          }
          <EditarDatos usuario={usuario}/>
          <div className="mb-2"><DomicilioUsuario usuarioDatos={usuario} domicilio={domicilio}/></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    usuario: state.usuario
  }
}

export default connect(mapStateToProps)(Perfil);