import React, { Component } from 'react';
import InputGroup from '../Utilidades/input-group';
import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { ingresarUsuario } from '../../redux/actions/usuario_actions';


class Ingresar extends Component {

  state = {
    email: '',
    password: '',
    errors: {}
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  onSubmit = e => {

    e.preventDefault();

    const { email, password } = this.state;

    // Validación

    if (email === "") {
      this.setState({errors: {email: 'Falta ingresar su email'}})
      return;
    }

    if (password === "") {
      this.setState({errors: {password: 'Falta ingresar contraseña'}})
      return;
    }
  
    var dataToSubmit = {"email": this.state.email, "contraseña": this.state.password};

    this.props.dispatch(ingresarUsuario(dataToSubmit)).then(res => {
      if (res.payload.loginSuccess) {
        this.props.history.push('/perfil');
      } else {
        this.setState({
          errors: {password: res.payload.message}
        })
      }
    })

    this.setState({
      email: '',
      password: '',
      errors: {}
    })
  }

  render() {
    return (
      <div className="row justify-content-center m-3">
        <div className="col-md-4">
          <h1 className="text-info text-center p-4">Iniciar Sesión</h1>
          <form onSubmit={this.onSubmit.bind(this)}>
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
              name="password"
              placeholder="Ingrese su contraseña..."
              value={this.state.password}
              type="password"
              onChange={this.onChange}
              error={this.state.errors.password}
            />
            <div className="text-center">
              <input type="submit" className="btn btn-info btn-lg m-4 p-3" value="Ingresar"/>
            </div>
            <div className="text-center">
              <span className="text-info">
                Aún no tienes una cuenta? Puedes registrarte como
                <Link to="/registro_profesional" className="font-weight-bold"> profesional</Link> o como 
                <Link to="registro_empleador" className="font-weight-bold"> empleador</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect()(withRouter(Ingresar));