import React, { Component } from 'react';
import Postulante from './postulante';

class InfoEmpleo extends Component {
  renderPostulantes = () => (
    this.props.candidatos.map(candidato => (
      <div className="col-md-10 m-2">
        <Postulante 
          key={candidato._id}
          nombre={candidato.nombre}
          apellido={candidato.apellido}
          foto={candidato.fotoDePerfil}
          email={candidato.email}
          telefono={candidato.telefono}
        />
      </div>
    ))
  )

  render() {
    return (
      <div style={{padding: 8}}>
        <div className="row">
          {this.renderPostulantes()}
        </div>
      </div>
    )
  }
}

export default InfoEmpleo;