import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputGroup from '../../Utilidades/input-group';
import Select from 'react-select';
import { getHabilidades } from '../../../redux/actions/habilidad_actions';
import { agregarTrabajo } from '../../../redux/actions/trabajo_actions';
import { profesiones } from '../../Utilidades/profesiones';

class CrearEmpleo extends Component {
  state = {
    titulo: "",
    descripcion: "",
    cantidadPostulantes: 10,
    profesionRequerida: "",
    habilidadesRequeridas: [],
    errors: {}
  }

  listarHabilidades = () => {
    var habilidades = [];
      this.props.dispatch(getHabilidades(this.state.profesionRequerida)).then(res => {
        res.payload.map(item => {
          item.label = item.nombre;
          item.value = item.nombre;
          delete item.nombre;
          return habilidades.push(item);
        });
      });
    return habilidades;
  }
 
  onChange = event => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  handleChange = habilidadesRequeridas => {
    this.setState({habilidadesRequeridas});
  }

  guardarTrabajo = () => {
    var dataToSubmit = {};
    var listaHabilidades = [];
    if (this.state.habilidadesRequeridas.length > 0) {
      this.state.habilidadesRequeridas.map(habilidad => {
        listaHabilidades.push(habilidad.value);
        return listaHabilidades;
      })
    }
    dataToSubmit = {
      "titulo": this.state.titulo,
      "descripcion": this.state.descripcion,
      "cantidadCandidatosPermitidos": this.state.cantidadPostulantes,
      "creador": this.props.usuario.usuarioDatos.id,
      "profesionRequerida": this.state.profesionRequerida,
      "habilidadesRequeridas": listaHabilidades
    }
    this.props.dispatch(agregarTrabajo(dataToSubmit));
  }

  limpiarTrabajo = () => {
    this.setState({
      titulo: "",
      descripcion: "",
      cantidadPostulantes: null,
      profesionRequerida: "",
      habilidadesRequeridas: null,
      errors: {}
    })
  }

  render() {
    return (
      <div className="container">
        <div style={{padding: 30, margin: '0 auto'}}>
          <form>
            <InputGroup 
              caso="input"
              name="titulo"
              label="Título"
              type="text"
              autofocus={true}
              error={this.state.errors.titulo}
              onChange={this.onChange}
            />
            <InputGroup
              caso="textarea"
              name="descripcion"
              label="Descripción"
              type="text"
              error={this.state.errors.descripcion}
              onChange={this.onChange}
            />
            <InputGroup 
              caso="input"
              name="cantidadPostulantes"
              label="Cantidad de postulantes permitidos"
              type="number"
              error={this.state.errors.cantidadPostulantes}
              onChange={this.onChange}
            />
            <InputGroup
              caso="select"
              name="profesionRequerida"
              label="Profesión requerida"
              type="text"
              list={profesiones}
              error={this.state.errors.profesionRequerida}
              onChange={this.onChange}
            />
            { this.state.profesionRequerida !== "" ?
              <div>
                <h5 className="font-weight-bold text-secondary" htmlFor="habilidades">Habilidades</h5>
                  <Select
                  autoFocus
                  isMulti
                  options={this.listarHabilidades()}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={this.state.habilidadesRequeridas}
                  onChange={this.handleChange}
                  placeholder={"Seleccione sus habilidades..."}
                />
              </div>
              : null }
            {this.state.errors.habilidadesRequeridas ? <p className="text-danger">Debe ingresar al menos una habilidad</p> : null}
            <div className="text-center">
              <button className="btn btn-info btn-lg m-2" onClick={() => this.guardarTrabajo()}>Guardar</button>
              <button className="btn btn-secondary btn-lg m-2" onClick={() => this.limpiarTrabajo()}>Limpiar</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect()(CrearEmpleo);