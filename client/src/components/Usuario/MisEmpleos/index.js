import React, { Component } from 'react';
import axios from 'axios';
import Empleo from './empleo';

class MisEmpleos extends Component {
  state = {
    listaEmpleos: []
  }

  componentDidMount() {
    axios.get('/api/trabajos/trabajos_por_profesional')
      .then(res => this.setState({listaEmpleos: res.data}));
  }

  despostular = id => {
    var dataToSubmit = {
      "id": id,
      "candidato": this.props.usuario.usuarioDatos.id
    }
    console.log(dataToSubmit);
    axios.put('/api/trabajos/despostular', dataToSubmit).then(() => {
      this.setState({listaEmpleos: this.state.listaEmpleos.filter(empleo => empleo._id !== id)})
    })
  }

  renderEmpleos = () => (
    this.state.listaEmpleos.map(empleo => (
      <Empleo
        key={empleo._id}
        id={empleo._id}
        foto={empleo.creador.fotoDePerfil}
        titulo={empleo.titulo}
        empresa={empleo.creador.nombre + " " + empleo.creador.apellido}
        despostular={(id) => this.despostular(id)}
      /> 
    ))
  )

  render() {
    return (
      <div style={{padding: 10}}>
        <div className="row justify-content-center">
          {this.renderEmpleos()}
        </div>
      </div>
    )
  }
}

export default MisEmpleos;