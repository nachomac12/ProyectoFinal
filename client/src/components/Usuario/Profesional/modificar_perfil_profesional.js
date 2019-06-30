import React, { Component } from 'react';
import { connect } from 'react-redux';
import UsuarioLayout from '../usuario_layout';
import CambiarFoto from '../../Utilidades/Usuarios/cambiar_foto';
import SeleccionarHabilidades from '../../Utilidades/Usuarios/seleccionar_habilidades';
import EditarDatos from '../../Utilidades/Usuarios/editar_datos';
import CambiarContraseña from '../../Utilidades/Usuarios/cambiar_contraseña';

class ModificarPerfilProfesional extends Component {

  render() {
    return (
      <UsuarioLayout>
        <div className="row">
          <div className="col-md">
            <CambiarFoto 
              data={this.props.usuario.usuarioDatos}
            />
          </div>
          <div className="col-md">
            <EditarDatos
              email={this.props.usuario.usuarioDatos.email}
              nombre={this.props.usuario.profesional ? this.props.usuario.profesional.nombre : null}
              apellido={this.props.usuario.profesional ? this.props.usuario.profesional.apellido : null}
              usuario={this.props.usuario.usuarioDatos}
              profesional={this.props.usuario.profesional ? this.props.usuario.profesional : null}
            />
          </div>
          <div className="col-md">
            <CambiarContraseña/>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-11">
            <h4 className="text-info">Mis habilidades</h4>
            <SeleccionarHabilidades 
              profesional={this.props.usuario.profesional ? this.props.usuario.profesional : null}
              profesion={this.props.usuario.profesional ? this.props.usuario.profesional.profesion : null}
              habilidades={this.props.usuario.profesional ? this.props.usuario.profesional.habilidades : null}
            />
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

export default connect(mapStateToProps)(ModificarPerfilProfesional);