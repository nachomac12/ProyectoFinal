import React, { Component } from 'react';
import PaperEdit from './paper_edit';

class EditarDatos extends Component {
  render() {
    return (
      <div className="text-center"> 
        <div>
          <PaperEdit 
            nombre="Email"
            data={this.props.usuario.email}
            inputType="email"
            case="email"
            usuario={this.props.usuario}
          />
        </div>
        <div className="mt-2">
          <PaperEdit 
            nombre="Nombre"
            data={this.props.usuario.nombre}
            inputType="text"
            case="nombre"
            usuario={this.props.usuario}
          />
        </div>
        <div className="mt-2">
          <PaperEdit 
            nombre="Apellido"
            data={this.props.usuario.apellido}
            inputType="text"
            case="apellido"
            usuario={this.props.usuario}
          />
        </div>
        <div className="mt-2">
          <PaperEdit 
            nombre="Telefono"
            data={this.props.usuario.telefono}
            inputType="text"
            case="telefono"
            usuario={this.props.usuario}
          />
        </div>
      </div>
    )
  }
}

export default EditarDatos;