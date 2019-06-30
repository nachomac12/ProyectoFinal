import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Edit from '@material-ui/icons/Edit';
import Done from '@material-ui/icons/Done';
import Close from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import { 
  cambiarEmail, 
  editarNombreProfesional, 
  editarApellidoProfesional 
} from '../../redux/actions/usuario_actions';

class PaperEdit extends Component {
  state = {
    edit: false,
    texto: '',
    error: null
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  modificarCampo = () => {
    var dataToSubmit = {};
    switch(this.props.case) {
      case "email":
        console.log('hola')
        if (this.state.texto !== "" && this.state.texto.includes('@')) {
          dataToSubmit = {"email": this.state.texto}
          this.props.dispatch(cambiarEmail(dataToSubmit, this.props.usuario))
            .then(res => {this.setState({edit: false})})
        }
      break;
      case "nombre":
        if (this.state.texto !== "") {
          dataToSubmit = {"nombre": this.state.texto}
          this.props.dispatch(editarNombreProfesional(dataToSubmit, this.props.profesional))
            .then(res => {this.setState({edit: false})})
        }
      break;
      case "apellido":
        if (this.state.texto !== "") {
          dataToSubmit = {"apellido": this.state.texto}
          this.props.dispatch(editarApellidoProfesional(dataToSubmit, this.props.profesional))
            .then(res => {this.setState({edit: false})})
        }
      break;
    }
  }

  render() {
    return (
      <Paper className="col-md" style={{padding: '10px'}}>
        <h4 style={{color: '#3f51b5'}}>{this.props.nombre}</h4>
        {!this.state.edit ?
          <div>
            <p>{this.props.data}</p>
            <Edit 
              style={{top: 10, right: 25, position:'absolute', cursor:"pointer"}} 
              color="primary"
              onClick={() => this.setState({edit: true})}
            />
          </div>
        : <div className="input-group mb-3">
            <input 
              type={this.props.inputType}
              className="form-control" 
              placeholder={`Inserte un nuevo ${this.props.nombre.toLowerCase()}`}
              name="texto"
              onChange={this.onChange}
            />  
            <div className="input-group-append">
              <button 
                className="btn btn-outline-info"
                onClick={() => {this.modificarCampo()}} 
                type="button"
              ><Done color="primary" fontSize="small"/></button>
              <button 
                className="btn btn-outline-danger"
                onClick={() => {this.setState({edit: false})}}
              ><Close color="secondary" fontSize="small"/></button>
            </div>
          </div>
        }
      </Paper>
    )
  }
}

export default connect()(PaperEdit);