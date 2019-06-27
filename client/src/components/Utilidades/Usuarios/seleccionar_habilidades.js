import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getHabilidades } from '../../../redux/actions/habilidad_actions';
import { 
  agregarHabilidadesProfesional,
  eliminarHabilidadProfesional 
} from '../../../redux/actions/usuario_actions';
import Chip from '@material-ui/core/Chip';

class SeleccionarHabilidades extends Component {
  state = {
    habilidades: null,
    valores: null
  };

  componentDidUpdate() {
    // this.handleOptions()
    if (this.props.habilidades && this.props.profesion) {
      var habilidades = [];
      this.props.dispatch(getHabilidades(this.props.profesion)).then(res => {
        habilidades = res.payload;
        habilidades.map(item => {
          item.label = item.nombre;
          item.value = item.nombre;
          delete item.nombre;
        });
        habilidades = habilidades
          .filter(habilidad => !this.props.habilidades.includes(habilidad.value))
          .sort(this.dynamicSort("label"));
        this.setState({habilidades});
      });
    }
  }

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

  // handleOptions = () => {
  //   if (this.props.habilidades && this.props.profesion) {
  //     var habilidades = [];
  //     this.props.dispatch(getHabilidades(this.props.profesion)).then(res => {
  //       habilidades = res.payload;
  //       habilidades.map(item => {
  //         item.label = item.nombre;
  //         item.value = item.nombre;
  //         delete item.nombre;
  //       });
  //       habilidades = habilidades
  //         .filter(habilidad => !this.props.habilidades.includes(habilidad.value))
  //         .sort(this.dynamicSort("label"));
  //       this.setState({habilidades});
  //     });
  //   }
  // }

  handleChange = valores => {
    this.setState({ valores });
  };

  guardarValores = () => {
    var dataToSubmit = {};
    var arrayValores = [];
    if (this.state.valores !== null) {
      this.state.valores.map(valor => {
        arrayValores.push(valor.value);
      })
      dataToSubmit = {"habilidades": arrayValores};
      this.props.dispatch(agregarHabilidadesProfesional(dataToSubmit, this.props.profesional))
        .then(res => {
          this.setState({valores: null});
        })
    }
  }

  handleDelete = (habilidad) => {
    console.log(this.props.profesional)
    if (this.props.profesional) {
      this.props.dispatch(eliminarHabilidadProfesional(habilidad, this.props.profesional))
        .then(() => console.log('hola', this.props.profesional))
    }
  }

  renderChips = () => {
    if (this.props.habilidades) {
      return this.props.habilidades.map((habilidad, i) => {
        return (
          <Chip
            key={i}
            style={{
              marginTop: 3,
              marginLeft: 3
            }}
            label={habilidad}
            onDelete={() => this.handleDelete(habilidad)}
            variant="outlined"
            color="primary"
          />
        )
      })
    }
  }

  render() {
    return (
      <div className="row mt-2">
        <div className="col">
          <Select
            isMulti
            name="Habilidades"
            options={this.state.habilidades}
            className="basic-multi-select"
            classNamePrefix="select"
            value={this.state.valores}
            onChange={this.handleChange}
          />
          <div style={{
            border: '1px solid #17a2b8', 
            borderRadius: '5px', 
            marginTop: '10px', 
            padding: '8px'
          }}>
            {this.renderChips()}
          </div>
        </div>

        <div className="col-xs-1">
          <button 
              className="btn btn-outline-primary"
              onClick={() => {this.guardarValores()}}
          >Guardar</button>
        </div>
      </div>
    );
  }
}

export default connect()(SeleccionarHabilidades);