import React, { Component } from 'react';
import { connect } from 'react-redux';
import UsuarioLayout from '../usuario_layout';
import CambiarFoto from '../../Utilidades/Usuarios/cambiar_foto';
import EditarDatos from '../../Utilidades/Usuarios/editar_datos';
import CambiarContraseña from '../../Utilidades/Usuarios/cambiar_contraseña';

class ModificarPerfilEmpleador extends Component {

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
              nombre={this.props.usuario.empleador ? this.props.usuario.empleador.nombre : null}
              apellido={this.props.usuario.empleador ? this.props.usuario.empleador.apellido : null}
              usuario={this.props.usuario.usuarioDatos}
              empleador={this.props.usuario.empleador ? this.props.usuario.empleador : null}
            />
          </div>
          <div className="col-md">
            <CambiarContraseña/>
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

export default connect(mapStateToProps)(ModificarPerfilEmpleador);