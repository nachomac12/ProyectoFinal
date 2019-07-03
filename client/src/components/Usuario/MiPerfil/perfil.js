import React, { Component } from 'react';
import UsuarioLayout from '../usuario_layout';
import { connect } from 'react-redux';
import UsuarioCard from './Usuario_Card';
import EditarDatos from './editar_datos';
import SeleccionarHabilidades from './seleccionar_habilidades';
import DomicilioUsuario from './domicilio_usuario';

class Perfil extends Component {

  render() {
    const usuario = this.props.usuario.usuarioDatos;
    const profesional = this.props.usuario.profesional;
    const empleador = this.props.usuario.empleador;
    return (
      <UsuarioLayout>
        <div className="row">
          <div className="col-md-4">
            <UsuarioCard 
              datosUsuario={usuario}
              profesional={profesional}
              empleador={empleador}
            />
          </div>
          <div className="col-md">
            <EditarDatos usuario={usuario}/>
            {/* <div style={{marginTop: 20}}><SeleccionarHabilidades profesional={profesional}/></div> */}
            <div className="mt-2"><DomicilioUsuario /></div>
          </div>
        </div>
      </UsuarioLayout>
    )
  }
}

function mapStateToProps(state) {
  return {
    usuario: state.usuario
  }
}

export default connect(mapStateToProps)(Perfil);