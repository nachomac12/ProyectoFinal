import React, { Component } from 'react';
import Select from 'react-select';
import {getHabilidades} from '../../../redux/actions/habilidad_actions';
import {connect} from 'react-redux';
import { Search } from '@material-ui/icons';
import axios from 'axios';
import Trabajo from './trabajo';

class BuscarTrabajo extends Component {
  state = {
    habilidades: [],
    listaHabilidades: [],
    trabajos: []
  }

  componentDidMount() {
    axios.get('/api/usuarios/profesionales/profesion').then(res => {
      var listaHabilidades = [];
      this.props.dispatch(getHabilidades(res.data)).then(res => {
        res.payload.map(item => {
          var obj = {};
          obj["label"] = item.nombre;
          obj["value"] = item.nombre;
          return listaHabilidades.push(obj);
        });
        this.setState({listaHabilidades});
      });
    });
  }

  onChangeHabilidades = habilidades => {
    this.setState({ habilidades });
  };

  realizarBusqueda = () => {
    var array = [];
    var dataToSubmit = {};
    this.state.habilidades.map(hab => {
      return array.push(hab.value);
    })

    if (array.length > 0) {
      dataToSubmit["habilidades"] = array;
    }

    dataToSubmit["profesion"] = "Programador";

    axios.post("/api/trabajos/buscartrabajo", dataToSubmit)
      .then(res => this.setState({trabajos: res.data}));
  }

  renderTrabajos = () => (
    this.state.trabajos.map(trabajo => (
        <Trabajo 
          key={trabajo._id}
          trabajo={trabajo}
          postular={id => this.postular(id)}
        />
    ))
  )

  postular = (id) => {
    var dataToSubmit = {
      "id": id,
      "candidato": this.props.usuario.usuarioDatos.id
    }
    axios.put('/api/trabajos/postular', dataToSubmit).then(res => {
      this.setState({trabajos: this.state.trabajos.filter(trabajo => trabajo._id !== res.data._id)});
    })
  }

  render() {
    return (
      <div style={{paddingTop: 10, paddingBottom: 450}}>
        <div className="row justify-content-center" style={{marginBottom: 20}}>
          <div className="col-md-9">
            <Select 
              isMulti
              options={this.state.listaHabilidades}
              value={this.state.habilidades}
              onChange={this.onChangeHabilidades}
              placeholder={"Habilidades"}
            />
          </div>
          <div className="col-md-1">
            <button className="btn btn-outline-info btn-block text-center"
              onClick={() => this.realizarBusqueda()}  
            ><Search fontSize="small"/></button>
          </div>
        </div>
        <div className="col-md-10" style={{margin: '0 auto'}} >
          <div className="row">
            {this.renderTrabajos()}
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(BuscarTrabajo);