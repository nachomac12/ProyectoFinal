import React, { Component } from "react";
// UTILIDADES
import InputGroup from "../Utilidades/input-group";
import CollapsibleGroup from "../Utilidades/collapsible_group";
// REDUX
import { connect } from 'react-redux';
import { nuevoEmpleador, registrarUsario } from '../../redux/actions/usuario_actions';
// COMPONENTES
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const tipos = [
  {
    "_id": 0,
    "nombre": "Empresa"
  },
  {
    "_id": 1,
    "nombre": "Particular"
  }
]

class RegistroEmpleador extends Component {
  state = {
    nombre: '',
    profesion: '',
    tipos,
    email: '',
    password: '',
    repetirPassword: '',
    errors: {},
    desactivarFormDatosPersonales: false,
    desactivarFormDatosCuenta: false,
    empleadorID: '',
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
      case ('datosPersonales'):
        return this.setState({
          desactivarFormDatosPersonales: true
        });
      case ('datosCuenta'):
        return this.setState({
          desactivarFormDatosCuenta: true
        });
      default:
        return null
    }
  }

  submitDatosPersonales = (event) => {
    event.preventDefault();
    const { nombre, apellido, tipo } = this.state;
    if (nombre === "") {
      this.setState({errors: {nombre: "Falta ingresar el nombre"}});
      return;
    }

    if (tipo === "") {
      this.setState({errors: {tipo: "Falta ingresar el tipo"}});
      return;
    }

    var dataToSubmit = {"nombre": nombre, "apellido": apellido, "tipo": tipo};
    this.props.dispatch(nuevoEmpleador(dataToSubmit)).then(res => {
      if (res.payload.success) {
        this.setState({empleadorID: res.payload.empleadorData._id})
        console.log(this.state.empleadorID);
        this.handleBloquearFormulario('datosPersonales');
      } else {
        return (
          alert("Hubo un error")
        )
      }
    })
    
  }

  submitDatosCuenta = (event) => {
    event.preventDefault();
    const { email, password, repetirPassword } = this.state;
    if (this.state.desactivarFormDatosPersonales) {
      if (email === "") {
        this.setState({errors: {email: "Falta ingresar el nombre"}});
        return;
      }

      if (password === "") {
        this.setState({errors: {password: "Falta ingresar el apellido"}});
        return;
      }

      if (repetirPassword === "") {
        this.setState({errors: {repetirPassword: "Falta ingresar la profesión"}});
        return;
      }

      if (password !== repetirPassword) {
        this.setState({errors: {repetirPassword: "Las contraseñas no coinciden"}});
        return;
      }

      var dataToSubmit = {"email": email, "contraseña": password, "empleador": this.state.empleadorID};
      this.props.dispatch(registrarUsario(dataToSubmit)).then(res => {
        if (res.payload.success) {
          this.handleBloquearFormulario('datosCuenta');
          console.log(res.payload.usuariodata);
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

  handleFinalizar = () => {
    const { desactivarFormDatosCuenta, desactivarFormDatosPersonales } = this.state;
    if (desactivarFormDatosCuenta && desactivarFormDatosPersonales) {
      this.setState({
        open: true,
        dialogText: "Felicidades. Serás redireccionado en un instante",
        dialogAction: false
      })
      setTimeout(() => {
        this.props.history.push('/perfil');
      }, 3000)
    } else {
      this.setState({
        open: true, 
        dialogText: "Faltan completar datos!",
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
              titulo="Datos personales"
              open={true}
            >
              <form onSubmit={(event) => this.submitDatosPersonales(event)}>
                <InputGroup 
                  caso="input"
                  label="Nombre"
                  name="nombre"
                  value={this.state.nombre}
                  type="text"
                  placeholder="Ingrese su nombre..."
                  onChange={this.onChange}
                  error={this.state.errors.nombre}
                  disabled={this.state.desactivarFormDatosPersonales}
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
                  disabled={this.state.desactivarFormDatosPersonales}
                />
                <InputGroup
                  caso="select"
                  label="Tipo"
                  name="tipo"
                  value={this.state.tipo}
                  type="text"
                  onChange={this.onChange}
                  error={this.state.errors.tipo}
                  list={tipos}
                  disabled={this.state.desactivarFormDatosPersonales}
                />
                { this.state.desactivarFormDatosPersonales ?
                    <fieldset disabled>
                      <div className="text-center">
                        <input type="Submit" className="btn btn-info" value="Guardar datos personales"/>
                      </div>
                    </fieldset>
                  : 
                    <div className="text-center">
                      <input type="Submit" className="btn btn-info" value="Guardar datos personales"/>
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
                  label="Contraseña"
                  name="repetirPassword"
                  value={this.state.repetirPassword}
                  type="password"
                  placeholder="Repita la contraseña..."
                  onChange={this.onChange}
                  error={this.state.errors.repetirPassword}
                  disabled={this.state.desactivarFormDatosCuenta}
                />
                <div className="text-center">
                  <input type="Submit" className="btn btn-info" value="Guardar datos de la cuenta"/>
                </div>
                </form>
            </CollapsibleGroup>
          </div>
        </div>
        <div className="text-center m-3">
            <button className="btn btn-lg btn-info" onClick={() =>this.handleFinalizar()}>Finalizar!</button>
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

export default connect()(RegistroEmpleador);
