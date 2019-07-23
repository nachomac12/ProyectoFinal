import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import InputGroup from '../../Utilidades/input-group';
import Edit from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import Close from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { agregarEducacionProfesional, eliminarEducacionProfesional } from '../../../redux/actions/usuario_actions';

const fecha = new Date;
const añoActual = fecha.getFullYear();

class AgregarEducacion extends Component {
  state = {
    edit: false,
    instituto: '',
    añoIngreso: '',
    añoEgreso: '',
    titulo: '',
    ciudad: '',
    errors: {}
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  generarID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  guardarEducacion = (event) => {
    event.preventDefault();

    const { instituto, añoIngreso, añoEgreso, titulo, ciudad } = this.state;

    if (instituto === "") return this.setState({errors: {instituto: "Debe ingresar un instituto"}});
    if (titulo === "") return this.setState({errors: {titulo: "Debe ingresar su titulo obtenido"}});
    if (ciudad === "") return this.setState({errors: {ciudad: "Debe ingresar la ciudad de su institución"}});
    if (añoIngreso === "") return this.setState({errors: {añoIngreso: "Debe ingresar su año de ingreso a la institución"}});
    if (añoEgreso === "") return this.setState({errors: {añoEgreso: "Debe ingresar su año de egreso de la institución"}});
    if (añoIngreso.length !== 4) return this.setState({errors: {añoIngreso: "Debe ingresar un número de cuatro cifras"}});
    if (añoIngreso < 1950 || añoIngreso > añoActual) return this.setState({errors: {añoIngreso: `El año debe estar comprendido entre 1950 y ${añoActual}`}});
    if (añoEgreso.length !== 4) return this.setState({errors: {añoEgreso: "Debe ingresar un número de cuatro cifras"}});
    if (añoEgreso < 1950 || añoEgreso > 2050) return this.setState({errors: {añoEgreso: "El año debe estar comprendido entre 1950 y 2050"}});
    if (añoIngreso > añoEgreso) return this.setState({errors: {añoIngreso: "El año de ingreso no puede ser mayor al año de egreso"}})

    const dataToSubmit = {"educacion": {"id": this.generarID(), instituto, añoIngreso, añoEgreso, titulo, ciudad}};
    this.props.dispatch(agregarEducacionProfesional(dataToSubmit, this.props.profesional)).then(res => {
      this.setState({
        edit: false,
        instituto: '',
        añoIngreso: '',
        añoEgreso: '',
        titulo: '',
        ciudad: '',
        errors: {}
      })
    })
  }

  renderEducacion = () => {
    if (this.props.profesional && this.props.profesional.educacion && this.props.profesional.educacion.length > 0) {
      return this.props.profesional.educacion.map((item, i) => {
        return (
          <div className="row" key={i}>
            <div className="col-md">
              <p>{i+1 + ". " + item.titulo + ", " + item.instituto + ". " + item.añoIngreso + "-" + item.añoEgreso}</p>
            </div>
            <div className="col-md-1">
              <Close style={{color: 'red', cursor: 'pointer'}} onClick={() => this.onDelete(item.id)}/>
            </div>
          </div>
        )
      })
    } else {
      return (<p>No ha ingresado una institución.</p>)
    }
  }

  onDelete = (id) => {
    this.props.dispatch(eliminarEducacionProfesional(id, this.props.profesional));
  }

  render() {
    return (
      <Paper className="col-md" style={{padding: 10}}>
        {this.state.edit ?
          <div>
            <InputGroup
              caso="input"
              type="text"
              name="instituto"
              label="Institución"
              placeholder="Ej.: Universidad Nacional de La Plata"
              value={this.state.instituto}
              error={this.state.errors.instituto}
              onChange={this.onChange}
              autoFocus={true}
            />
            <InputGroup
              caso="input"
              type="text"
              name="titulo"
              label="Titulo obtenido"
              placeholder="Ej.: Licenciatura en Bioquímica"
              value={this.state.titulo}
              error={this.state.errors.titulo}
              onChange={this.onChange}              
            />
            <InputGroup
              caso="input"
              type="text"
              name="ciudad"
              label="Ciudad de estudio"
              placeholder="Ej.: La Plata"
              value={this.state.ciudad}
              error={this.state.errors.ciudad}
              onChange={this.onChange}
            />
            <div className="row">
              <div className="col-md">
                <InputGroup
                  caso="input"
                  type="number"
                  name="añoIngreso"
                  label="Año de ingreso"
                  placeholder="Ej.: 2014"
                  value={this.state.añoIngreso}
                  error={this.state.errors.añoIngreso}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md">
                <InputGroup
                  caso="input"
                  type="number"
                  name="añoEgreso"
                  label="Año de egreso"
                  placeholder="Ej.: 2020"
                  value={this.state.añoEgreso}
                  error={this.state.errors.añoEgreso}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="text-right">
              <button className="btn btn-outline-info mr-2" onClick={event => this.guardarEducacion(event)}>OK</button>
              <button className="btn btn-outline-secondary" onClick={() => this.setState({edit: false})}>Cerrar</button>
            </div>
          </div>
        : <div>
            <Edit 
              style={{top: 10, right: 25, position:'absolute', cursor:"pointer"}} 
              color="primary"
              onClick={() => this.setState({edit: true})}
            />
            <h4 className="text-center" style={{color: '#3f51b5'}}>Educación</h4>
            <Divider />
            <div style={{margin: 10}}>
              {this.renderEducacion()}
            </div>
          </div>
        }
      </Paper>
    )
  }
}

export default connect()(AgregarEducacion);