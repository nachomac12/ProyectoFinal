import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDomicilio } from '../../../redux/actions/usuario_actions';
import Divider from '@material-ui/core/Divider';

class Curriculum extends Component {
  state = {
  }

  componentDidMount() {
    this.props.dispatch(getDomicilio()).then(res => {
      console.log(res.payload, this.props)
    })
  }

  listar = (lista, caso) => {
    if (lista) {
      switch (caso) {
        case "habilidad":
          if (lista.length > 0) {
            return lista.map((item, i) => (
              lista.length-1 === i
                ? <span key={i}>{item}.</span>
                : <span key={i}>{item}, </span>
            ))
          } else return <p>No ha seleccionado habilidades.</p>
        case "idioma":
          if (lista.length > 0) {
            return lista.map((item, i) => (
              <span key={i}>{item.idioma} {item.nivel}<br/></span>
            ))
          } else return <p>No ha seleccionado idiomas.</p>
        case "educacion":
          if (lista.length > 0) {
            return lista.map((item, i) => (
              <div key={i} style={{marginTop: 5}}>
                <span><b>{item.instituto}, </b> {item.ciudad} - <i>{item.titulo}</i></span><br/>
                <span>{item.añoIngreso + " - " + item.añoEgreso}</span>
              </div>
            ))
          } else return <p>No ha ingresado su educación.</p>
        default: return null
      }
    }
  }

  render() {
    const domicilio = this.props.usuario.domicilio;
    const profesional = this.props.usuario.profesional;
    const usuario = this.props.usuario.usuarioDatos;
    return (
      <div className="container-fluid row justify-content-center p-3">
        <div className="col-md-7 p-2" style={{border: '1px solid gray'}}>
          <div className="row mb-2">
            <div className="col-md-4">
              <img className="img-thumbnail" alt="img" src={usuario.fotoDePerfil}/>
            </div>
            <div className="col-md">
              <div className="row">
                <div className="col-md">
                  <h3>{usuario.nombre + " " + usuario.apellido}</h3>
                  <h5 className="text-secondary">{profesional ? profesional.profesion : null}</h5>
                </div>
                <div className="col-md">
                  {domicilio ? 
                    <div className="text-right mr-1">
                      <p>{domicilio.direccion} {domicilio.piso ? <span>| Piso: {domicilio.piso}</span> : null}</p>
                      <p>{domicilio.localidad}, {domicilio.provincia}</p>
                      <p className="font-weight-bold">+54 {usuario.telefono}</p>
                      <p className="font-weight-bold">{usuario.email}</p>
                    </div>
                  : null}
                </div>
              </div>
              <div className="row">
                <div className="col-md">
                  <b>Descripcion personal</b> <br/>
                  <i>{usuario.descripcion}</i>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="row" style={{margin: 20}}>
            <div className="col-md">
              <h5 className="text-info">Experiencia</h5>
                <p>En construcción gente, no se puede todo jeje</p>
              <h5 className="text-info mt-4">Educación</h5>
                {this.listar(profesional ? profesional.educacion : null, "educacion")}
            </div>
            <div className="col-md-3">
              <h5 className="text-info">Habilidades</h5>
                {this.listar(profesional ? profesional.habilidades : null, "habilidad")}
              <h5 className="text-info mt-4">Idiomas</h5>
                {this.listar(profesional ? profesional.idiomas : null, "idioma")}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Curriculum);