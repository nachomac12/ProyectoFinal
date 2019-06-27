import React, { Component } from 'react';
import UsuarioLayout from './usuario_layout';
import { connect } from 'react-redux';
import { buscarEmpleadorPorID, buscarProfesionalPorID } from '../../redux/actions/usuario_actions';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import StarRateIcon from '@material-ui/icons/StarRate';

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
      iniciales = this.state.usuario.nombre.charAt(0).concat(this.state.usuario.apellido.charAt(0));
    }
    return iniciales;
  }

  listarHabilidades = (habilidades) => {
    return habilidades.map((habilidad, i) => {
      if (i < habilidades.length-1) {
        return <span key={i}>{`${habilidad}, `}</span>
      } else {
        return <span key={i}>{`${habilidad}.`}</span>
      }
    })
  }
  
  cardContent = () => {
    var cardContent = null;
    if (this.state.usuario) {
      if (this.props.usuario.usuarioDatos.esProfesional) {
        cardContent = (
          <div className="text-center">
            <h4>Trabajos que está realizando</h4>
            {
              this.props.usuario.profesional.trabajosHaciendose.length > 0 ?
                <p>Está realizando trabajos</p>
              : <p>Aún no ha realizado ningún trabajo</p>
            }
            <Divider /> <br/>
            <h4>Habilidades</h4>
              {
                this.props.usuario.profesional.habilidades.length > 0 ?
                  <p>{this.listarHabilidades(this.props.usuario.profesional.habilidades)}</p>
                : <p>Aún no ha seleccionado sus habilidades</p>
              }
            <Divider /> <br/>
            <h4>Historial de trabajos realizados</h4>
            {
              this.props.usuario.profesional.historialTrabajos.length > 0 ?
                <p>Ha realizado trabajos</p>
              : <p>Aún no ha completado ningún trabajo</p>
            }
            <Divider /> <br />
            <h4>Puntuación</h4>
            {this.rateIcon()}
          </div>
        )
      } 
      if (this.props.usuario.usuarioDatos.esEmpleador) {
        cardContent = (
          <div>
            <h4>Trabajos publicados:</h4>
            {
              this.props.usuario.empleador.trabajos.length > 0 ?
                <p>Tiene trabajos publicados</p>
              : <p>Aún no ha publicado ningún empleo</p>
            }
            <Divider />
          </div>
        )
      }
    }
    return cardContent;
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
        <div className="row justify-content-center">
          <Card className="col-md-5 mr-2">
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
              style = {{ height: 400, paddingTop: '56.25%', maxHeight:345 }}
            />
          </Card>
          <Card className="col-md-5">
            <CardContent>
              {this.cardContent()}
            </CardContent>
          </Card>
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