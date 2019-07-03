import React, { Component } from 'react';
import axios from 'axios';
import { Paper, Divider } from '@material-ui/core';
import Select from 'react-select';
import Edit from '@material-ui/icons/Edit';

class DomicilioUsuario extends Component {
  state = {
    edit: false,
    listaProvincias: null,
    listaLocalidades: null,
    provincia: "",
    localidad: "",
    direccion: "",
    piso: ""
  }

  componentDidMount() {
    axios.get('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre')
      .then(res => {
        var provincias = res.data.provincias;
        var i;
        for (i = 0; i < provincias.length; i++) {
          provincias[i].label = provincias[i]["nombre"];
          provincias[i].value = provincias[i]["id"];
          delete provincias[i].nombre;
          delete provincias[i].id;
        }
        this.setState({listaProvincias: provincias})
      })
  }

  onChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value})
  }

  onChangeProvincia = (opcion) => {
    this.setState({provincia: opcion})

    axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${opcion.value}&campos=id,nombre&max=1000`)
      .then(res => {
        var localidades = res.data.localidades;
        var i;
        for (i = 0; i < localidades.length; i++) {
          localidades[i].label = localidades[i]["nombre"];
          localidades[i].value = localidades[i]["id"];
          delete localidades[i].nombre;
          delete localidades[i].id;
        }
        this.setState({listaLocalidades: localidades})
      })
  }

  onChangeLocalidad = (opcion) => {
    this.setState({localidad: opcion})
  }

  render() {
    const localidadNula = [{label: "Debe ingresar una provincia", value:""}]
    console.log(this.state)
    return (
      <Paper className="col-md" style={{padding: 10}}>
        <h4 className="text-center" style={{color: '#3f51b5'}}>Domicilio</h4>
        <Divider />
      {this.state.edit ?
        <div>
          <h5 className="font-weight-bold text-secondary mt-2" htmlFor="provincia">Provincia</h5>
          <Select 
            options={this.state.listaProvincias}
            onChange={this.onChangeProvincia}
            value={this.state.provincia}
            name="provincia"
            placeholder="Ej: Buenos Aires"
          />
          <h5 className="font-weight-bold text-secondary mt-2" htmlFor="localidad">Localidad</h5>
          <Select 
            options={this.state.listaLocalidades ? this.state.listaLocalidades : localidadNula}
            onChange={this.onChangeLocalidad}
            value={this.state.localidad}
            name="localidad"
            placeholder="Ej: La Plata"
          />
          <h5 className="font-weight-bold text-secondary mt-2" htmlFor="direccion">Dirección</h5>
          <input className="form-control" 
            name="direccion"
            type="text"
            placeholder="Ej: Calle 47 742"
            onChange={this.onChange}
          />
          <h5 className="font-weight-bold text-secondary mt-2" htmlFor="piso">Piso</h5>
          <input className="form-control"
            name="piso"
            type="text"
            placeholder="Ej: 7 C"
            onChange={this.onChange}
          />
          <div className="text-center mt-2">
            <button className="btn btn-outline-info mr-2">Guardar</button>
            <button className="btn btn-outline-secondary" onClick={() => this.setState({edit: false})}>Cancelar</button>
          </div>
        </div>
        :
        <div className="text-center mt-2">
          <p>Buenos Aires</p>
          <p>La Plata</p>
          <p>Calle 2, 1052</p>
          <p>9 B</p>
          <Edit 
            style={{top: 10, right: 25, position:'absolute', cursor:"pointer"}} 
            color="primary"
            onClick={() => this.setState({edit: true})}
          />
        </div>
      }
      </Paper>
    )
  }
}

export default DomicilioUsuario;