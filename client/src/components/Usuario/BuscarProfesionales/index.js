import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buscarProfesionales } from '../../../redux/actions/usuario_actions';
import CardProfesional from './card_profesional';
import OpcionesBusqueda from './opciones_busqueda';
import axios from 'axios';

class BuscarProfesionales extends Component {
  state = {
    lista: null,
    perf: null
  }

  traerProfesionales = (profesion, localidad, habilidades, idiomas) => {
    var dataToSubmit = {};
    if (profesion !== "") {
      dataToSubmit["profesion"] = profesion;
    };
    if (localidad !== "") {
      dataToSubmit["localidad"] = localidad;
    };
    if (habilidades.length > 0) {
      dataToSubmit["habilidades"] = habilidades;
    };
    if (idiomas.length > 0) {
      dataToSubmit["idiomas"] = idiomas;
    };
    const ti = performance.now();
    axios.post('/api/usuarios/buscarprofesionales', dataToSubmit).then(res => {
      this.setState({lista: res.data.profesionales});
      const tf = performance.now();
      const perf = Math.round(tf-ti)/1000;
      this.setState({perf: <p>{res.data.size + " resultados en " + perf + " segundos."}</p>})
    })
  }

  renderCards = () => {
    if (this.state.lista !== null) {
      if (this.state.lista.length > 0) {
        return this.state.lista.map((item, i) => {
          return (
            <div className="col-md-3 mb-2" key={i}>
              <CardProfesional 
                usuario={item}
                profesional={item.profesional}
                domicilio={item.domicilio}
              />
            </div>
          )
        })
      } else return <div style={{height: 700}}><h1 className="text-center font-weight-bold text-secondary">Lo sentimos, no hubo coincidencias.</h1></div>
    } else return <div style={{height: 700}}/>;
  }

  render() {
    return (
      <div className="container-fluid p-4">
        <div className="row justify-content-center">
          <div className="col-md-2 m-2">
            <OpcionesBusqueda traerProfesionales={(profesion, localidad, habilidades, idiomas) => this.traerProfesionales(profesion, localidad, habilidades, idiomas)}/>
          </div>
          <div className="col-md">
            <div className="text-right m-2 text-secondary">{this.state.perf}</div>
            <div className="row justify-content-center">
              {this.renderCards()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(BuscarProfesionales);