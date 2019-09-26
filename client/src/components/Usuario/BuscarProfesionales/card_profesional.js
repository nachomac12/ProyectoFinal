import React from 'react';
import './card_profesional.css';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Modal from '../../Utilidades/modal';
import Curriculum from '../MiCurriculum/curriculum';
import { Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import StarRateIcon from '@material-ui/icons/StarRate';


const CardProfesional = (props) => {
  const obtenerAvatar = () => {
    var iniciales = '';
    if (props.usuario) {
      iniciales = props.usuario.nombre.charAt(0).concat(props.usuario.apellido.charAt(0));
    }
    return iniciales;
  }

  const rateIcon = () => {
    var rateIconList = [];
    if (props.usuario) {
      if (props.profesional) {
        for (let i = 0; i < props.profesional.puntuacion; i++) {
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

  const nivel = () => {
    switch(props.profesional.puntuacion) {
      case 1: return "Junior"
      case 2: return "Semi Senior"
      case 3: return "Senior"
    }
  }

  return (
    <Modal
      id={`modal${props.usuario._id}`}
      title={props.usuario.nombre + " " + props.usuario.apellido}
      body={<Curriculum usuario={props.usuario} profesional={props.profesional} domicilio={props.domicilio}/>}
      footer={
        <button 
          onClick={() => props.history.push(`/postular/${props.usuario._id}`)}
          className="btn btn-lg btn-outline-info"
          data-dismiss="modal" aria-label="Close">Postular</button>
      }
    >
      <div className="ProfesionalBox">
        <Card>
            <CardHeader 
              style={{height: 100}}
              avatar={
                <Avatar>
                  {obtenerAvatar()}
                </Avatar>
              }
              title={
                props.usuario.nombre + " " + props.usuario.apellido
              }
              subheader= {props.profesional.profesion}
            />
            <Divider/>  
            <CardMedia 
              image={props.usuario.fotoDePerfil}
              style = {{ height: 350, paddingTop: '56.25%', maxHeight: 200}}
            />
            <CardContent >
              <div className="Content">
                {props.profesional.habilidades.map((habilidad, i) => (
                  props.profesional.habilidades.length-1 === i ?
                    <span key={i}><b>{habilidad}.</b></span>
                  : <span key={i}><b>{habilidad}, </b></span>
                ))}
              </div>
              <Divider className="m-2"/>
              <div className="text-center">
                <span><span style={{fontSize: 12, color: 'gray'}}>{nivel()}</span><br/>{rateIcon()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
    </Modal>
  )
}

export default withRouter(CardProfesional);