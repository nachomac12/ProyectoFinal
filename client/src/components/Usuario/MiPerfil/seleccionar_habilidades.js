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
    if (this.props.profesional) {
      var habilidades = [];
      this.props.dispatch(getHabilidades(this.props.profesional.profesion)).then(res => {
        habilidades = res.payload;
        habilidades.map(item => {
          item.label = item.nombre;
          item.value = item.nombre;
          delete item.nombre;
        });
        habilidades = habilidades
          .filter(habilidad => !this.props.profesional.habilidades.includes(habilidad.value))
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
    if (this.props.profesional) {
      return this.props.profesional.habilidades.map((habilidad, i) => {
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
            options={this.state.habilidades}
            className="basic-multi-select"
            classNamePrefix="select"
            value={this.state.valores}
            onChange={this.handleChange}
            placeholder={"Seleccione sus habilidades..."}
            styles={colourStyles}
          />
          <div style={{
            border: '1px solid #3F51B5', 
            borderRadius: '5px', 
            marginTop: '10px', 
            padding: '10px'
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

const colourStyles = {
  option: (styles) => ({
    ...styles,
    color: '#1F96F3',
    fontWeight: 'bold'
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: '#197ED9',
    backgroundColor: '#F4F7FA'
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: '#197ED9',
    backgroundColor: '#F4F7FA',
    ':hover': {
      backgroundColor: '#197ED9',
      color: 'white',
    },
  })
}

export default connect()(SeleccionarHabilidades);