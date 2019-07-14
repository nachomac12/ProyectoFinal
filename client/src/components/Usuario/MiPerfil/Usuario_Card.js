import React, { Component } from 'react';
import './CambiarFoto.css';
import { cambiarFotoPerfil } from '../../../redux/actions/usuario_actions';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from 'firebase';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import StarRateIcon from '@material-ui/icons/StarRate'
import Divider from '@material-ui/core/Divider';
import Edit from '@material-ui/icons/EditOutlined';
import DescripcionUsuario from './descripcion_usuario';
import { CardContent } from '@material-ui/core';

class UsuarioCard extends Component {
  state = {
    loading: false
  }

  onChange = e => {
    if (e.target.files[0]) {
      const imagen = e.target.files[0];
      var dataToSubmit = {};
      const uploadTask = firebase.storage().ref(`images/${imagen.name}`).put(imagen)
      uploadTask.on('state_changed', 
        snap => {
          this.setState({loading: true})
        },
        error => {
          console.log(error)
        },
        () => {
          firebase.storage().ref('images').child(imagen.name).getDownloadURL().then(url => {
            dataToSubmit = {'fotoDePerfil': url};
            this.props.dispatch(cambiarFotoPerfil(dataToSubmit, this.props.datosUsuario)).then(() => {
              this.setState({loading:false})
            })
          })
        }
      )
    }
  }

  subheaderHandler = () => {
    if (this.props.profesional) return this.props.profesional.profesion;
    if (this.props.empleador) return this.props.empleador.tipo;
  }

  obtenerAvatar = () => {
    var iniciales = '';
    if (this.props.datosUsuario) {
      if (this.props.datosUsuario.apellido !== "") {
        iniciales = this.props.datosUsuario.nombre.charAt(0).concat(this.props.datosUsuario.apellido.charAt(0));
      } else {
        iniciales = this.props.datosUsuario.nombre.charAt(0)
      }
    }
    return iniciales;
  }

  rateIcon = () => {
    var rateIconList = [];
    if (this.props.datosUsuario) {
      if (this.props.profesional) {
        for (let i = 0; i < this.props.profesional.puntuacion; i++) {
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
      <div className="mb-1">
        <Card style={{maxWidth: 350}}>
          <CardHeader 
            avatar={
              <Avatar>
                {this.obtenerAvatar()}
              </Avatar>
            }
            title={
              this.props.datosUsuario.nombre + " " + this.props.datosUsuario.apellido
            }
            subheader= {
              this.subheaderHandler()
            }
          />
          <Divider/>  
          {!this.state.loading ?
          <div className="hovereffect" style={{maxHeight: 350, marginBottom: 10}}>
            <CardMedia
              image={this.props.datosUsuario.fotoDePerfil}
              style = {{ height: 350, paddingTop: '56.25%'}}
            />
            <label htmlFor="file-upload" style={{cursor: 'pointer'}}>
              <div className="overlay">
                <h2>Elegir foto</h2>
                <a className="info" href="#">
                  <Edit fontSize="inherit" style={{fontSize: '4em'}}/>
                </a>
              </div>
            </label>
          </div>
          :
          <div style={{height: 350, width: 350, marginBottom: 10}}>
            <CircularProgress style={{top: 175, left: 175, position: 'absolute'}}/>
          </div>
          }
          <CardContent >
            <DescripcionUsuario usuario={this.props.datosUsuario}/>
            <Divider className="mt-2"/>
          </CardContent>
        </Card>
        <input 
          id="file-upload"
          type="file"
          onChange={this.onChange}
          style={{display: 'none'}}
        />
      </div>
    )
  }
}

export default connect()(UsuarioCard);