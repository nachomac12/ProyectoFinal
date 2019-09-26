import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDomicilio } from '../../../redux/actions/usuario_actions';
import UsuarioCard from './Usuario_Card';
import EditarDatos from './editar_datos';
import SeleccionarHabilidades from './seleccionar_habilidades';
import DomicilioUsuario from './domicilio_usuario';
import AgregarIdiomas from './agregar_idiomas';
import AgregarEducacion from './agregar_educacion';

class Perfil extends Component {
  componentDidMount() {
    this.props.dispatch(getDomicilio())
  }

  render() {
    const usuario = this.props.usuario.usuarioDatos;
    const profesional = this.props.usuario.profesional;
    const empleador = this.props.usuario.empleador;
    const domicilio = this.props.usuario.domicilio;
    return (
      <div className="row justify-content-center" style={{margin: 10}}>
        <div className="col-md">
          <UsuarioCard 
            datosUsuario={usuario}
            profesional={profesional}
            empleador={empleador}
          />
        </div>
        <div className="col-md">
          <EditarDatos usuario={usuario}/>
          <div className="mb-2"><DomicilioUsuario usuarioDatos={usuario} domicilio={domicilio}/></div>
        </div>
        {usuario.esProfesional ?
          <div className="col-md">
            <div className="mb-2"><SeleccionarHabilidades profesional={profesional}/></div>
            <div className="mb-2"><AgregarIdiomas profesional={profesional}/></div>
            <div className="mb-2"><AgregarEducacion profesional={profesional}/></div>
          </div>
        : null}
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