import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buscarProfesionales } from '../../../redux/actions/usuario_actions';
import CardProfesional from './card_profesional';
import OpcionesBusqueda from './opciones_busqueda';

class BuscarProfesionales extends Component {
  state = {
    lista: null
  }

  traerProfesionales = (profesion, localidad, habilidades, idiomas) => {
    var dataToSubmit = {};
    if (profesion !== "") {
      dataToSubmit["profesion"] = profesion;
    };
    if (localidad !== "") {
      dataToSubmit["localidad"] = localidad;
    }
    if (habilidades.length > 0) {
      dataToSubmit["habilidades"] = habilidades;
    }
    if (idiomas.length > 0) {
      dataToSubmit["idiomas"] = idiomas;
    }
    this.props.dispatch(buscarProfesionales(dataToSubmit))
      .then(res => {
        this.setState({lista: res.payload.profesionales});
        console.log(res.payload)
      });
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
      } else return <h1 style={{paddingBottom: 200}} className="text-center font-weight-bold text-secondary">No hubo coincidencias.</h1>
    } else return <h1 style={{paddingBottom: 200}} className="text-center font-weight-bold text-secondary">Realice una búsqueda y aquí aparecerán los resultados obtenidos.</h1>;
  }

  render() {
    return (
      <div className="container-fluid p-4">
        <div className="row justify-content-center">
          <div className="col-md-2 m-2">
            <OpcionesBusqueda 
              traerProfesionales={(profesion, localidad, habilidades, idiomas) => this.traerProfesionales(profesion, localidad, habilidades, idiomas)}/>
          </div>
          <div className="col-md">
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