import React, { Component } from "react";
// UTILIDADES
import InputGroup from "../Utilidades/input-group";
import { profesiones } from '../Utilidades/profesiones';
import CollapsibleGroup from "./collapsible_group";
// REDUX
import { connect } from 'react-redux';
import { nuevoProfesional, registrarUsario } from '../../redux/actions/usuario_actions';
// COMPONENTES
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import LinearProgress from '@material-ui/core/LinearProgress';


class RegistroProfesional extends Component {
  state = {
    nombre: '',
    apellido: '',
    profesion: '',
    email: '',
    password: '',
    repetirPassword: '',
    errors: {},
    desactivarFormProfesion: false,
    desactivarFormDatosCuenta: false,
    profesionalID: '',
    open: false,
    dialogText: '',
    dialogAction: false
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleBloquearFormulario = (caso) => {
    switch(caso) {
      case ('Profesion'):
        return this.setState({
          desactivarFormProfesion: true
        });
      case ('datosCuenta'):
        return this.setState({
          desactivarFormDatosCuenta: true
        });
      default:
        return null
    }
  }

  submitProfesion = (event) => {
    event.preventDefault();
    const { profesion } = this.state;
    if (profesion === "") {
      this.setState({errors: {profesion: "Falta ingresar la profesión"}});
      return;
    }

    var dataToSubmit = {"profesion": profesion};
    this.props.dispatch(nuevoProfesional(dataToSubmit)).then(res => {
      if (res.payload.success) {
        this.setState({profesionalID: res.payload.profesionalData._id})
        console.log(this.state.profesionalID);
        this.handleBloquearFormulario('Profesion');
      } else {
        return (
          alert("Hubo un error")
        )
      }
    })
    
  }

  submitDatosCuenta = (event) => {
    event.preventDefault();
    const { email, password, repetirPassword, nombre, apellido } = this.state;
    if (this.state.desactivarFormProfesion) {
      if (nombre === "") {
        this.setState({errors: {nombre: "Falta ingresar su nombre"}});
        return;
      }

      if (apellido === "") {
        this.setState({errors: {apellido: "Falta ingresar su apellido"}})
        return;
      }

      if (email === "") {
        this.setState({errors: {email: "Falta ingresar el mail"}});
        return;
      }

      if (password === "") {
        this.setState({errors: {password: "Ingrese una contraseña"}});
        return;
      }

      if (repetirPassword === "") {
        this.setState({errors: {repetirPassword: "Repita la contraseña"}});
        return;
      }

      if (password.length < 6) {
        this.setState({errors: {password: "La contraseña debe tener como mínimo 6 caracteres"}});
        return;
      }

      if (password !== repetirPassword) {
        this.setState({errors: {repetirPassword: "Las contraseñas no coinciden"}});
        return;
      }

      var dataToSubmit = {
        "email": email, 
        "contraseña": password, 
        "profesional": this.state.profesionalID,
        "nombre": this.state.nombre,
        "apellido": this.state.apellido
      };
      this.props.dispatch(registrarUsario(dataToSubmit)).then(res => {
        if (res.payload.success) {
          this.handleBloquearFormulario('datosCuenta');
          this.setState({
            open: true,
            dialogText: 
              <span>
              ¡Felicidades, ya se ha registrado! Sera redirigido en breve<br/><LinearProgress variant="query"/>
              </span> 
          })
          setTimeout(() => {
            this.props.history.push('/ingresar')
          }, 4000);
        }
      })
    } else {
      this.setState({
        open: true,
        dialogText: "Debe completar el formulario anterior",
        dialogAction: true
      })
    }
  }
  
  render() {
    return (
      <div>
        <div className="row justify-content-center m-3">
          <div className="col-md-5">
            <CollapsibleGroup
              titulo="Elegir Profesión"
              open={true}
            >
              <form onSubmit={(event) => this.submitProfesion(event)}>
                <InputGroup
                  caso="select"
                  label="Profesión"
                  name="profesion"
                  value={this.state.profesion}
                  type="text"
                  onChange={this.onChange}
                  error={this.state.errors.profesion}
                  list={profesiones}
                  disabled={this.state.desactivarFormProfesion}
                />
                { this.state.desactivarFormProfesion ?
                    <fieldset disabled>
                      <div className="text-center">
                        <input type="Submit" className="btn btn-info" value="Guardar datos personales"/>
                      </div>
                    </fieldset>
                  : 
                    <div className="text-center">
                      <input type="Submit" className="btn btn-info" value="Guardar profesión"/>
                    </div>
                }
              </form>
            </CollapsibleGroup>
          </div>
        </div>

        <div className="row justify-content-center m-3">
          <div className="col-md-5">
            <CollapsibleGroup
              titulo="Datos de cuenta"
              open={false}
            >
              <form onSubmit={(event) => this.submitDatosCuenta(event)}>
              <InputGroup 
                  caso="input"
                  label="Nombre"
                  name="nombre"
                  value={this.state.nombre}
                  type="text"
                  placeholder="Ingrese su nombre..."
                  onChange={this.onChange}
                  error={this.state.errors.nombre}
                  disabled={this.state.desactivarFormDatosCuenta}
                />
                <InputGroup 
                  caso="input"
                  label="Apellido"
                  name="apellido"
                  value={this.state.apellido}
                  type="text"
                  placeholder="Ingrese su apellido..."
                  onChange={this.onChange}
                  error={this.state.errors.apellido}
                  disabled={this.state.desactivarFormDatosCuenta}
                />
                <InputGroup 
                  caso="input"
                  label="Email"
                  name="email"
                  value={this.state.email}
                  type="email"
                  placeholder="Ingrese su email..."
                  onChange={this.onChange}
                  error={this.state.errors.email}
                  disabled={this.state.desactivarFormDatosCuenta}
                />
                <InputGroup 
                  caso="input"
                  label="Contraseña"
                  name="password"
                  value={this.state.password}
                  type="password"
                  placeholder="Ingrese su contraseña..."
                  onChange={this.onChange}
                  error={this.state.errors.password}
                  disabled={this.state.desactivarFormDatosCuenta}
                />
                <InputGroup 
                  caso="input"
                  label="Repetir contraseña"
                  name="repetirPassword"
                  value={this.state.repetirPassword}
                  type="password"
                  placeholder="Repita la contraseña..."
                  onChange={this.onChange}
                  error={this.state.errors.repetirPassword}
                  disabled={this.state.desactivarFormDatosCuenta}
                />
                <div className="text-center">
                  <input type="Submit" className="btn btn-info" value="Guardar datos"/>
                </div>
                </form>
            </CollapsibleGroup>
          </div>
        </div>

        <Dialog open={this.state.open}>
          <DialogContent>
            <DialogContentText className="text-primary">{this.state.dialogText}</DialogContentText>
          </DialogContent>
          { 
          this.state.dialogAction ?
            <DialogActions>
              <button className="btn btn-outline-info" onClick={() => this.setState({open: false})}>OK</button>
            </DialogActions>
          : null
          }
        </Dialog>
      </div>
    );
  }
}

export default connect()(RegistroProfesional);
