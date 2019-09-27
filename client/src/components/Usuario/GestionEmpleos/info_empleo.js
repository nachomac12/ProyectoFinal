import React, { Component } from 'react';
import Postulante from './postulante';

class InfoEmpleo extends Component {
  renderPostulantes = () => (
    this.props.candidatos.map(candidato => (
      <div className="col-md-10" style={{margin: '0 auto'}}>
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
        <h3 className="text-center text-info mb-4">{this.props.titulo}</h3>
        {this.renderPostulantes()}
      </div>
    )
  }
}

export default InfoEmpleo;