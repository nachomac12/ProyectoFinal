import React, { Component } from 'react';
import { cambiarDescripcion } from '../../../redux/actions/usuario_actions';
import { connect } from 'react-redux';
import Edit from '@material-ui/icons/Edit';

class DescripcionUsuario extends Component {
  state = {
    descripcion: '',
    edit: false
  }

  onChange = (event) => {
    this.setState({descripcion: event.target.value})
    console.log(event.target.value)
  }

  guardarDescripcion = () => {
    const dataToSubmit = {"descripcion": this.state.descripcion}
    this.props.dispatch(cambiarDescripcion(dataToSubmit, this.props.usuario))
      .then(res => {
        this.setState({edit: false})
      })
  }

  render() {
    return (
    <div>
      {this.state.edit ?
      <div>
        <textarea 
          className="form-control" 
          value={this.state.descripcion} 
          onChange={this.onChange}
        />
        <div className="text-center mt-2">
          <button className="btn btn-outline-info mr-1" onClick={() => this.guardarDescripcion()}>Guardar</button>
          <button className="btn btn-outline-secondary" onClick={() => this.setState({edit: false})}>Cancelar</button>
        </div>
      </div>
      :
      <div>
        <i style={{marginTop: 10}}>{this.props.usuario.descripcion ? this.props.usuario.descripcion : "Escribe una descripción personal..."}</i>
        <div className="text-right"><Edit color="primary" style={{cursor: 'pointer'}} onClick={() => this.setState({edit: true})}/></div>
      </div>
      }
    </div>
    )
  }
}

export default connect()(DescripcionUsuario);
