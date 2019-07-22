import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDomicilio } from '../../../redux/actions/usuario_actions';
import Curriculum from './curriculum';

class MiCurriculum extends Component {
  state = {
  }

  componentDidMount() {
    this.props.dispatch(getDomicilio())
  }

  

  render() {
    const domicilio = this.props.usuario.domicilio;
    const profesional = this.props.usuario.profesional;
    const usuario = this.props.usuario.usuarioDatos;
    return (
      <div className="container-fluid row justify-content-center p-3">
        <div className="col-md-7 p-2" style={{ border: "1px solid gray" }}>
          <Curriculum usuario={usuario} domicilio={domicilio} profesional={profesional}/>
        </div>
      </div>
    )
  }
}

export default connect()(MiCurriculum);