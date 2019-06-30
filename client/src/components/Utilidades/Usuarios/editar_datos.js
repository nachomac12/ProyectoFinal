import React, { Component } from 'react';
import PaperEdit from '../paper_edit';

class EditarDatos extends Component {
  render() {
    return (
      <div className="text-center"> 
        <div>
          <PaperEdit 
            nombre="Email"
            data={this.props.email}
            inputType="email"
            case="email"
            usuario={this.props.usuario}
            tipoUsuario={this.props.tipoUsuario}
          />
        </div>
        <div className="mt-2">
          <PaperEdit 
            nombre="Nombre"
            data={this.props.nombre}
            inputType="text"
            case="nombre"
            usuario={this.props.usuario}
            tipoUsuario={this.props.tipoUsuario}
          />
        </div>
        <div className="mt-2">
          <PaperEdit 
            nombre="Apellido"
            data={this.props.apellido}
            inputType="text"
            case="apellido"
            usuario={this.props.usuario}
            tipoUsuario={this.props.tipoUsuario}
          />
        </div>
      </div>
    )
  }
}

export default EditarDatos;