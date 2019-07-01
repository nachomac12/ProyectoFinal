import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Edit from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { connect } from 'react-redux';

import axios from 'axios';

import { USUARIO_SERVER } from '../../Utilidades/misc';

class CambiarContraseña extends Component {
  state = {
    edit: false,
    contraseñaVieja: '',
    contraseñaNueva: '',
    repetirContraseñaNueva: '',
    vision: false
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  renderInputs = () => (
    <div>
      <input
        placeholder="Ingrese su ANTIGUA contraseña..." 
        className="form-control mt-2"
        type={!this.state.vision ? "password" : "text"}
        name="contraseñaVieja"
        onChange={this.onChange}
      />
      <input
        placeholder="Ingrese su NUEVA contraseña..." 
        className="form-control mt-2"
        type={!this.state.vision ? "password" : "text"}
        name="contraseñaNueva"
        onChange={this.onChange}
      />
      <input
        placeholder="Ingrese su NUEVA contraseña..." 
        className="form-control mt-2"
        type={!this.state.vision ? "password" : "text"}
        name="repetirContraseñaNueva"
        onChange={this.onChange}
      />
      <div className="row text-center mt-3">
        <div className="col">
          {/* <button className="btn btn-outline-info" onClick={() => this.props.dispatch(cambiarPassword({"contraseña": this.state.contraseñaNueva}, this.props.usuario))}>Guardar</button> */}
          <button className="btn btn-outline-info" onClick={() => axios.put(`${USUARIO_SERVER}/cambiarpassword`, {"contraseña": this.state.contraseñaNueva})}>Guardar</button>
        </div>
        <div className="col">
          <button className="btn btn-outline-danger" onClick={() => this.setState({edit: false})}>Cancelar</button>
        </div>
        <div className="col">
          <button className="btn btn-outline-dark" onClick={() => this.setState({vision: !this.state.vision})}>
            {this.state.vision 
              ? <VisibilityOff style={{cursor: 'pointer'}}/>
              : <Visibility style={{cursor: 'pointer'}}/>  
            }
          </button>
        </div>
      </div>
    </div>
  )

  render() {
    return (
      <Paper style={{padding: '10px'}}>
        <h4 style={{color: '#3f51b5'}} className="text-center">Cambiar contraseña</h4>
        {!this.state.edit
          ?<Edit
              style={{top: 10, right: 25, position: 'absolute', cursor:"pointer"}} 
              color="primary"
              onClick={() => this.setState({edit: true})}
            />
          : null
        }
        {this.state.edit
          ? this.renderInputs()
          : <fieldset disabled>{this.renderInputs()}</fieldset>
        }
      </Paper>
    )
  }
}

export default connect()(CambiarContraseña);
