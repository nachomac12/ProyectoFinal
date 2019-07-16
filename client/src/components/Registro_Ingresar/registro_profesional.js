import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import InputGroup from '../Utilidades/input-group'
import Select from 'react-select';
import { profesiones } from '../Utilidades/profesiones';
import { connect } from 'react-redux';
import { getHabilidades } from '../../redux/actions/habilidad_actions';
import { nuevoProfesional, registrarUsario, agregarHabilidadesProfesional, ingresarUsuario } from '../../redux/actions/usuario_actions';


const steps = ['Elige tu profesión', 'Completa tus datos', 'Elige al menos una habilidad'];

class RegistroProfesional extends Component {
  state = {
    activeStep: 0,
    errors: {},
    profesion: '',
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    repetirContraseña: '',
    listaHabilidades: [],
    habilidades: null,
    openDialog: false,
    dialogAction: false,
    dialogText: ''
  }
  
  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleChange = habilidades => {
    this.setState({habilidades})
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return this.primerPaso();
      case 1:
        return this.segundoPaso();
      case 2:
        return this.tercerPaso();
      default:
        return 'Unknown step';
    }
  }

  primerPaso = () => (
    <div className="col-md-5 text-left">
      <InputGroup
        caso="select"
        label="Profesión"
        name="profesion"
        value={this.state.profesion}
        type="text"
        onChange={this.onChange}
        error={this.state.errors.profesion}
        list={profesiones}
        autoFocus={true}
      />
    </div>
  )

  segundoPaso = () => (
    <div className="col-md-5 text-left">
      <InputGroup 
        caso="input"
        label="Nombre"
        name="nombre"
        placeholder="Ingrese su nombre..."
        value={this.state.nombre}
        type="text"
        onChange={this.onChange}
        error={this.state.errors.nombre}
        autoFocus={true}
      />
      <InputGroup 
        caso="input"
        label="Apellido"
        name="apellido"
        placeholder="Ingrese su apellido"
        value={this.state.apellido}
        type="text"
        onChange={this.onChange}
        error={this.state.errors.apellido}
      />
      <InputGroup 
        caso="input"
        label="Email"
        name="email"
        placeholder="Ingrese su email..."
        value={this.state.email}
        type="email"
        onChange={this.onChange}
        error={this.state.errors.email}
      />
      <InputGroup 
        caso="input"
        label="Contraseña"
        name="contraseña"
        placeholder="Ingrese su contraseña..."
        value={this.state.contraseña}
        type="password"
        onChange={this.onChange}
        error={this.state.errors.contraseña}
      />
      <InputGroup 
        caso="input"
        label="Repetir contraseña"
        name="repetirContraseña"
        placeholder="Repita la contraseña..."
        value={this.state.repetirContraseña}
        type="password"
        onChange={this.onChange}
        error={this.state.errors.repetirContraseña}
      />
    </div>
  )

  tercerPaso = () => {
    this.props.dispatch(getHabilidades(this.state.profesion)).then(res => {
      const listaHabilidades = res.payload;
      listaHabilidades.map(item => {
        item.label = item.nombre;
        item.value = item.nombre;
        delete item.nombre;
      });
      this.setState({listaHabilidades});
    });
    return (<div className="col-md-5 text-left mb-4">
        <h5 className="font-weight-bold text-secondary" htmlFor="habilidades">Habilidades</h5>
        <Select
        autoFocus
        isMulti
        options={this.state.listaHabilidades}
        className="basic-multi-select"
        classNamePrefix="select"
        value={this.state.habilidades}
        onChange={this.handleChange}
        placeholder={"Seleccione sus habilidades..."}
        name="habilidades"
      />
      {this.state.errors.habilidades ? <p className="text-danger">Debe ingresar al menos una habilidad</p> : null}
    </div>)
  }

  handleNext = () => {
    const { profesion, nombre, apellido, email, contraseña, repetirContraseña, habilidades } = this.state;

    if (this.state.activeStep === 0) {
      if (profesion === "") return this.setState({errors: {profesion: "Debe seleccionar una profesion"}});
    }
    if (this.state.activeStep === 1) {
      if (nombre === "") return this.setState({errors: {nombre: "Debe ingresar su nombre"}});
      if (apellido === "") return this.setState({errors: {apellido: "Debe ingresar su apellido"}});
      if (email === "") return this.setState({errors: {email: "Debe ingresar su email"}});
      if (!/\S+@\S+\.\S+/.test(email)) return this.setState({errors: {email: "El email es incorrecto"}});
      if (contraseña === "") return this.setState({errors: {contraseña: "Debe ingresar una contraseña"}});
      if (contraseña.length < 6) return this.setState({errors: {contraseña: "La contraseña debe contener al menos seis caracteres"}});
      if (repetirContraseña === "") return this.setState({errors: {repetirContraseña: "Debe ingresar una contraseña"}});
      if (contraseña !== repetirContraseña) return this.setState({errors: {repetirContraseña: "Las contraseñas no coinciden"}});
    }

    setTimeout(() => {
      this.setState({errors: {}})
    }, 1000);

    this.setState({activeStep: this.state.activeStep + 1})
  }

  handleBack = () => {
    this.setState({activeStep: this.state.activeStep -1})
  }

  onSubmit = (event) => {
    const { profesion, nombre, apellido, email, contraseña, habilidades } = this.state;

    event.preventDefault();
    
    if (habilidades === null) return this.setState({errors: {habilidades: true}});

    const profesional = {"profesion": profesion};
    
    this.props.dispatch(nuevoProfesional(profesional)).then(res => {
      const usuario = {"nombre": nombre, "apellido": apellido, "profesional": res.payload.profesionalData._id, "email": email, "contraseña": contraseña};
      this.props.dispatch(registrarUsario(usuario)).then(res2 => {
        this.props.dispatch(ingresarUsuario({email, contraseña})).then(res3 => {
          if (habilidades !== null) {
            var arrayHabilidades = [];
            habilidades.map(habilidad => {
              arrayHabilidades.push(habilidad.value);
            })
          }
          const habilidadesProfesional = {"habilidades": arrayHabilidades}
          this.props.dispatch(agregarHabilidadesProfesional(habilidadesProfesional, null)).then(res4 => {
            this.setState({
              openDialog: true,
              dialogAction: false,
              dialogText: <span style={{fontSize: 20}}>¡Felicidades, ya se ha registrado! Sera redirigido en breve<br/><LinearProgress variant="query"/></span>
            })
            setTimeout(() => {
              this.props.history.push('/ingresar')
            }, 4000);
          })
        })
      })
    })
  }

  render() {
    return (
      <div className="container-fluid" style={{padding: '20px 100px 100px 100px', height: 800}}>
        <h2 className="text-info text-center p-4">Registrarme como profesional</h2>
        <Stepper activeStep={this.state.activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel><b>{label}</b></StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {this.state.activeStep === steps.length ? (
          null
        ) : (
          <div className="text-center"> 
            <div className="row justify-content-center">{this.getStepContent(this.state.activeStep)}</div>
            <button className="btn btn-outline-secondary btn-lg mr-2" disabled={this.state.activeStep === 0} onClick={this.handleBack}>Atrás</button>
            {this.state.activeStep === steps.length - 1 
              ? <button className="btn btn-outline-info btn-lg" onClick={(event) => this.onSubmit(event)}>
                  Finalizar
                </button>
              : <button className="btn btn-outline-info btn-lg" onClick={this.handleNext}>
                Siguiente
              </button>
            } 
          </div>
        )}
      </div>
        <Dialog open={this.state.openDialog}>
          <DialogContent>
            <DialogContentText className="text-primary">{this.state.dialogText}</DialogContentText>
          </DialogContent>
          { 
          this.state.dialogAction ?
            <DialogActions>
              <button className="btn btn-outline-info" onClick={() => this.setState({openDialog: false})}>OK</button>
            </DialogActions>
          : null
          }
        </Dialog>
      </div>
    )
  }
}

export default connect()(RegistroProfesional);