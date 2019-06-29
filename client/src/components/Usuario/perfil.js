import React, { Component } from 'react';
import UsuarioLayout from './usuario_layout';
import { connect } from 'react-redux';
import { buscarEmpleadorPorID, buscarProfesionalPorID } from '../../redux/actions/usuario_actions';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import StarRateIcon from '@material-ui/icons/StarRate';
import PaperPerfil from '../Utilidades/paper_perfil';

class Perfil extends Component {
  state = {
    usuario: null
  }

  componentDidMount() {
    if (this.props.usuario.usuarioDatos) {
      if (this.props.usuario.usuarioDatos.esProfesional) {
        this.props.dispatch(buscarProfesionalPorID()).then(res => {
          this.setState({usuario: this.props.usuario.profesional});
        })
      } else {
        this.props.dispatch(buscarEmpleadorPorID()).then(res =>{
          this.setState({usuario: this.props.usuario.empleador});
        }) 
      }
    }
  }

  obtenerAvatar = () => {
    var iniciales = '';
    if (this.state.usuario) {
      if (this.state.usuario.apellido !== "") {
        iniciales = this.state.usuario.nombre.charAt(0).concat(this.state.usuario.apellido.charAt(0));
      } else {
        iniciales = this.state.usuario.nombre.charAt(0)
      }
    }
    return iniciales;
  }

  renderPapers = () => {
    var papers = null;
    if (this.state.usuario) {
      if (this.props.usuario.usuarioDatos.esProfesional) {
        papers=(
          <div>
            <PaperPerfil 
              titulo="Trabajos en curso"
              lista={this.props.usuario.profesional.trabajosHaciendose}
              texto="Aún no está realizando ningún trabajo."
            />
            <PaperPerfil
              titulo="Habilidades"
              lista={this.props.usuario.profesional.habilidades}
              texto="Aún no ha seleccionado sus habilidades."
            />
            <PaperPerfil
              titulo="Historial de trabajos"
              lista={this.props.usuario.profesional.historialTrabajos}
              texto="Aún no ha realizado ningún trabajo."
            />
          </div>)
      } 
      if (this.props.usuario.usuarioDatos.esEmpleador) {
        papers = (
          <div>
            <PaperPerfil 
              titulo="Trabajos creados"
              lista={this.props.usuario.empleador.trabajos}
              texto="Aún no ha creado ningún trabajo."
            />
          </div>
        )
      }
    }
    return papers;
  }

  rateIcon = () => {
    var rateIconList = [];
    if (this.state.usuario) {
      if (this.props.usuario.usuarioDatos.esProfesional) {
        for (let i = 0; i < this.props.usuario.profesional.puntuacion; i++) {
          rateIconList.push (
            <StarRateIcon key={i} className="text-warning" />
          )
        }
        return rateIconList.map(icon => {
          return icon
        });
      }
    }
  }

  render() {
    return (
      <UsuarioLayout>
        <div className="row">
          <Card className="col-md-5" style={{maxWidth: 400}}>
            <CardHeader 
              avatar={
                <Avatar>
                  {this.obtenerAvatar()}
                </Avatar>
              }
              title={
                this.state.usuario ?
                  this.state.usuario.nombre + " " + this.state.usuario.apellido
                : null
              }
              subheader= {
                this.state.usuario ? 
                  this.state.usuario.profesion ? this.state.usuario.profesion : this.state.usuario.tipo
                : null
              }
            />
            <CardMedia
              image={this.props.usuario.usuarioDatos.fotoDePerfil}
              style = {{ height: 400, paddingTop: '56.25%', maxHeight: 345}}
            />
          </Card>
          <div className="col-md-5">
            {this.renderPapers()}
          </div>
        </div>
      </UsuarioLayout>
    )
  }
}

function mapStateToProps(state) {
  return {
    usuario: state.usuario
  }
}

export default connect(mapStateToProps)(Perfil);