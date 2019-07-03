import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Edit from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import axios from 'axios';
import { USUARIO_SERVER } from '../../Utilidades/misc';

class CambiarContraseña extends Component {
  state = {
    edit: false,
    contraseñaVieja: '',
    contraseñaNueva: '',
    repetirContraseñaNueva: '',
    vision: false,
    abrir: false
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  cambiarPassword = () => {
    /*
      Acá habría que validar: 1) Que la contraseña vieja que estas ingresando este correcta,
      2) Que la contraseña vieja sea distinta de la nueva, 3) Que todas las contraseñas sean
      distintas de "", 4) Que las dos contraseñas nuevas coincidan
    */

    axios.put(`${USUARIO_SERVER}/cambiarpassword`, {"contraseña": this.state.contraseñaNueva})
      .then(res => {
        this.setState({
          edit: false,
          contraseñaVieja: '',
          contraseñaNueva: '',
          repetirContraseñaNueva: '',
          abrir: true
        })
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
          <button className="btn btn-outline-info" onClick={() => this.cambiarPassword()}>Guardar</button>
        </div>
        <div className="col">
          <button className="btn btn-outline-danger" onClick={() => this.setState({edit: false})}>Cancelar</button>
        </div>
        <div className="col">
        {this.state.edit ?
          <button className="btn btn-outline-dark" onClick={() => this.setState({vision: !this.state.vision})}>
            {this.state.vision 
              ? <VisibilityOff style={{cursor: 'pointer'}}/>
              : <Visibility style={{cursor: 'pointer'}}/>  
            }
          </button>
        : null}
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

        <Dialog open={this.state.abrir}>
          <DialogTitle><span className="text-info">Contraseña cambiada correctamente</span></DialogTitle>
          <DialogContent>
            <DialogContentText className="text-dark">Vuelve a iniciar sesión para verificarlo.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <button className="btn btn-secondary" onClick={() => this.setState({abrir: false})}>Cerrar</button>
          </DialogActions>
        </Dialog>
      </Paper>
    )
  }
}

export default CambiarContraseña;
