import React, { Component } from 'react';
import { idiomas, niveles } from '../../Utilidades/idiomas';
import InputGroup from '../../Utilidades/input-group';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import { agregarIdiomasProfesional, eliminarIdiomaProfesional } from '../../../redux/actions/usuario_actions';
import { Divider } from '@material-ui/core';

class AgregarIdiomas extends Component {
  state = {
    idioma: "",
    nivel: "",
    errors: {},
    edit: false,
    add: false
  }

  generarID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  dynamicSort = property => {
    var sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function(a, b) {
      if (sortOrder === -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  };

  listaFiltrada = () => {
    var arrayNombresIdiomas = [];
    if (this.props.profesional) {
      this.props.profesional.idiomas.map(item => {
        arrayNombresIdiomas.push(item.idioma)
      })
      return idiomas.filter(idioma => !arrayNombresIdiomas.includes(idioma.nombre))
    }
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  guardarIdiomas = (event) => {
    event.preventDefault();

    if (this.state.idioma === "") return this.setState({errors: {idioma: "Falta ingresar un idioma"}});
    if (this.state.nivel === "") return this.setState({errors: {nivel: "Falta ingresar el nivel"}});

    const dataToSubmit = {"idiomas": {"id": this.generarID(), "idioma": this.state.idioma, "nivel": this.state.nivel}};
    this.props.dispatch(agregarIdiomasProfesional(dataToSubmit, this.props.profesional))
      .then(res => {
        this.setState({idioma: '', nivel: '', add: false})
      })
  }

  handleDelete = (id) => {
    this.props.dispatch(eliminarIdiomaProfesional(id, this.props.profesional));
  }

  renderIdiomas = () => {
    if (this.props.profesional && this.props.profesional.idiomas && this.props.profesional.idiomas.length > 0) {
      if (this.state.edit) {
        return this.props.profesional.idiomas.map((item, i) => (
          <Chip
            label={item.idioma + ": " + item.nivel}
            onDelete={() => this.handleDelete(item.id)}
            color="primary"
            variant="outlined"
            key={i}
            style={{margin: 3}}
          />
        ))
      } else {
        return this.props.profesional.idiomas.map((item, i) => (
          <Chip
            label={item.idioma + ": " + item.nivel}
            color="primary"
            variant="outlined"
            key={i}
            style={{margin: 3}}
          />
        ))
      }
    } else {
      return <p className="text-center">No has seleccionado ningún idioma</p>
    }
  }

  renderAgregarIdiomas = () => {
    if (!this.state.edit && !this.state.add) {
      return (
        <div>
          <Edit 
            style={{top: 10, right: 25, position:'absolute', cursor:"pointer"}} 
            color="primary"
            onClick={() => this.setState({edit: true})}
          />
          <Add
            style={{top: 10, right: 55, position: 'absolute', cursor:"pointer"}}
            color="primary"
            onClick={() => this.setState({add: true})}
          />
          <div style={{textAlign: 'center', marginTop: 10}}>
            {this.renderIdiomas()}
          </div>
        </div>
      )
    } else if (!this.state.edit && this.state.add) {
      return (
        <div>
          <InputGroup 
            caso="select"
            name="idioma"
            type="text"
            autoFocus={true}
            label="Idioma"
            onChange={this.onChange}
            value={this.state.idioma}
            list={this.listaFiltrada().sort(this.dynamicSort('nombre'))}
            error={this.state.errors.idioma}
          />
          <InputGroup 
            caso="select"
            name="nivel"
            type="text"
            label="Nivel"
            value={this.state.nivel}
            onChange={this.onChange}
            list={niveles}
            error={this.state.errors.nivel}
          />
          <div className="text-right">
            <button className="btn btn-outline-info mr-2" onClick={event => this.guardarIdiomas(event)}>OK</button>
            <button className="btn btn-outline-secondary" onClick={() => this.setState({add: false})}>Cerrar</button>
          </div>
        </div>
      )
    } else {
      return (
        <div style={{textAlign: 'center', marginTop: 10}}>
          {this.renderIdiomas()}
          <div className="text-right">
            <button className="btn btn-outline-secondary mt-3" onClick={() => this.setState({edit: false})}>
              Atrás
            </button>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <Paper className="col-md" style={{padding: 10}}>
        <h4 className="text-center" style={{color: '#3f51b5'}}>Idiomas</h4>
        <Divider />
        {this.renderAgregarIdiomas()}
      </Paper>
    )
  }
}

export default connect()(AgregarIdiomas);