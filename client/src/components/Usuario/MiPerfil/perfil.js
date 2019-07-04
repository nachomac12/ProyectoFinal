import React, { Component } from 'react';
import UsuarioLayout from '../usuario_layout';
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
            <div className="row mt-2">
              <div className="col-md"><DomicilioUsuario usuarioDatos={usuario} domicilio={domicilio}/></div>
              {usuario.esProfesional 
                ? <div className="col-md"><SeleccionarHabilidades profesional={profesional}/></div>
                : null
              }
            </div>
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