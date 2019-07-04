import React, { Component } from 'react';
import PaperEdit from './paper_edit';

class EditarDatos extends Component {
  render() {
    return (
      <div className="text-center"> 
        <div className="row">
          <div className="col-md">
            <PaperEdit 
              nombre="Nombre"
              data={this.props.usuario.nombre}
              inputType="text"
              case="nombre"
              usuario={this.props.usuario}
            />
          </div>
          <div className="col-md">
            <PaperEdit 
              nombre="Apellido"
              data={this.props.usuario.apellido}
              inputType="text"
              case="apellido"
              usuario={this.props.usuario}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md">
            <PaperEdit 
              nombre="Email"
              data={this.props.usuario.email}
              inputType="email"
              case="email"
              usuario={this.props.usuario}
            />
          </div>
          <div className="col-md">
            <PaperEdit 
              nombre="Telefono"
              data={this.props.usuario.telefono}
              inputType="text"
              case="telefono"
              usuario={this.props.usuario}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default EditarDatos;