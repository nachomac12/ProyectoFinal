import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getHabilidades } from '../../../redux/actions/habilidad_actions';
import { profesiones } from '../../Utilidades/profesiones';
import { idiomas } from '../../Utilidades/idiomas';

class OpcionesBusqueda extends Component {
  state = {
    profesion: "",
    localidad: "",
    habilidades: [],
    idiomas: [],
    listaHabilidades: [],
    listaLocalidades: []
  }

  listarIdiomas = () => {
    var array = [];
    idiomas.map(idioma => {
      var obj = {};
      obj["label"] = idioma.nombre;
      obj["value"] = idioma.nombre;
      array.push(obj);
    })
    return array;
  }

  listarProfesiones = () => {
    var array = [];
    profesiones.map(profesion => {
      var obj = {}
      obj["label"] = profesion.nombre;
      obj["value"] = profesion.nombre;
      array.push(obj);
    })
    return array;
  }

  onChangeProfesion = profesion => {
    this.setState({ profesion });
    var listaHabilidades = [];
    this.props.dispatch(getHabilidades(profesion.value)).then(res => {
      res.payload.map(item => {
        var obj = {};
        obj["label"] = item.nombre;
        obj["value"] = item.nombre;
        listaHabilidades.push(obj);
      });
      this.setState({listaHabilidades});
    });
  };

  onChangeHabilidades = habilidades => {
    this.setState({ habilidades });
  };

  onChangeIdiomas = idiomas => {
    this.setState({ idiomas });
  };

  onChangeLocalidad = event => {
    this.setState({localidad: event.target.value});
  };

  traerProfesionales = () => {
    var idiomas = [];
    var habilidades = [];
    var localidad = "";
    var profesion = "";
    if (this.state.idiomas !== null) {
      this.state.idiomas.map(idioma => {
        idiomas.push(idioma.value);
      });
    } else {
      idiomas = [];
    }
    if (this.state.habilidades !== null) {
      this.state.habilidades.map(habilidad => {
        habilidades.push(habilidad.value)
      });
    } else {
      habilidades = [];
    };
    if (this.state.localidad !== "") {
      localidad = this.state.localidad.toUpperCase()
    };
    if (this.state.profesion !== "") {
      profesion = this.state.profesion.value
    };
    this.props.traerProfesionales(profesion, localidad, habilidades, idiomas);
  };

  limpiarInputs = () => {
    this.setState({
      profesion: "",
      localidad: "",
      habilidades: [],
      idiomas: [],
    })
  }

  render() {
    return (
      <div>
        <Select
          options={this.listarProfesiones()}
          onChange={this.onChangeProfesion}
          value={this.state.profesion}
          placeholder={"Profesión"}
        />
        {this.state.profesion !== ""
          ? <div style={{marginTop: 10}}>
              <Select 
                isMulti
                options={this.state.listaHabilidades}
                value={this.state.habilidades}
                onChange={this.onChangeHabilidades}
                placeholder={"Habilidades"}
              />
            </div>
          : null
        }
        <div style={{marginTop: 10}}>
          <Select 
            isMulti
            options={this.listarIdiomas()}
            value={this.state.idiomas}
            onChange={this.onChangeIdiomas}
            placeholder={"Idiomas"}
          />
        </div>
        <div style={{marginTop: 10}}>
          <input 
            className="form-control"
            value={this.state.localidad}
            placeholder="Localidad"
            onChange={this.onChangeLocalidad}
            type="text"
            name="localidad"
          />
        </div>
        <div className="row justify-content-center" style={{marginTop: 10}}>
          <div className="col-md">
            <button 
              className="btn btn-outline-primary btn-block mb-2"
              onClick={() => this.traerProfesionales()}
            > Buscar </button>
          </div>
          <div className="col-md">
            <button 
              className="btn btn-outline-secondary btn-block mb-2"
              onClick={() => this.limpiarInputs()}
            > Limpiar </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(OpcionesBusqueda);