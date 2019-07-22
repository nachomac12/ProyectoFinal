import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buscarProfesionales } from '../../../redux/actions/usuario_actions';
import CardProfesional from './card_profesional';
import Divider from '@material-ui/core/Divider';

class BuscarProfesionales extends Component {
  state = {
    lista: null
  }

  traerProfesionales = () => {
    this.props.dispatch(buscarProfesionales()).then(res => this.setState({lista: res.payload}));
    console.log(this.props.usuario);
  }

  renderCards = () => {
    if (this.state.lista !== null) {
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
    } else return null;
  }

  render() {
    return (
      <div className="container-fluid p-4">
        <div className="text-center" style={{marginBottom: 20}}>
          <h4 className="text-info">Click en el botón para buscar (todavía no hay filtros)</h4>
          <button className="btn btn-primary btn-lg p-4" onClick={() => this.traerProfesionales()}>Buscar</button>
        </div>
        <Divider/>
        <div className="row justify-content-center" style={{margin: 20}}>
          {this.renderCards()}
        </div>
      </div>
    )
  }
}

export default connect()(BuscarProfesionales);