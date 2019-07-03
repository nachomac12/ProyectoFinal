import React, { Component } from "react";
import { connect } from 'react-redux';
import { auth, buscarEmpleadorPorID, buscarProfesionalPorID } from '../../redux/actions/usuario_actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";


export default function (ComposedClass, reload, profesionalRoute=null, empleadorRoute= null) {
  class PermisosUsuario extends Component {
    state = {
      loading: true
    }

    componentDidMount() {
      this.props.dispatch(auth()).then(res => {
        let usuario = this.props.usuario.usuarioDatos;
        console.log(usuario);
        if (usuario) {
          this.props.dispatch(buscarEmpleadorPorID());
          this.props.dispatch(buscarProfesionalPorID());
        }
        
        if (!usuario.isAuth) {
          if (reload) {
            this.props.history.push('/ingresar');
          }
        } else {
          if ((profesionalRoute && !usuario.esProfesional) || (empleadorRoute && !usuario.esEmpleador)) {
            this.props.history.push('/perfil');
          } else {
            if (reload === false) {
              this.props.history.push('/perfil');
            }
          }
        }
        
        this.setState({
          loading: false
        })
      })
    }
    
    render() {
      if (this.state.loading) {
        return (
          <div className="text-center">
            <Dialog open={this.state.loading}>
              <DialogTitle>Cargando...</DialogTitle>
              <DialogContent>
                <CircularProgress style={{color: '#2196F3'}} thickness={7} style={{left:'30%', position:'relative'}} />
              </DialogContent>
            </Dialog>
          </div>
        )
      }
      return (
        <div>
          <ComposedClass {...this.props} usuario={this.props.usuario}/>
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return {
      usuario: state.usuario
    }
  }

  return connect(mapStateToProps)(PermisosUsuario);
}
