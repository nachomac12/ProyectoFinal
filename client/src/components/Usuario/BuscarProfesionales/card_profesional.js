import React from 'react';
import './card_profesional.css';
import Divider from '@material-ui/core/Divider';
import Modal from '../../Utilidades/modal';
import Curriculum from '../MiCurriculum/curriculum';

const CardProfesional = (props) => {
  return (
    <Modal
      id={`modal${props.usuario._id}`}
      title={props.usuario.nombre + " " + props.usuario.apellido}
      body={<Curriculum usuario={props.usuario} profesional={props.profesional} domicilio={props.domicilio}/>}
      modalStyle={{width: '150%'}}
      footer={
        <div className="text-center m-2">
          <button className="btn btn-outline-primary mr-3">Contratar</button>
          <button className="btn btn-outline-info mr-3">Postular</button>
          <button className="btn btn-outline-warning">Favorito</button>
        </div>
      }
    >
      <div className="ProfesionalBox">
        <img className="Image" src={props.usuario.fotoDePerfil} alt="img" />
        <div className="Content">
          <h3 className="text-info">{props.usuario.nombre + " " + props.usuario.apellido}</h3>
          <h5 className="text-secondary">{props.profesional.profesion}</h5>
          <i>{props.usuario.descripcion}</i>
        </div>
        <Divider />
        <div className="Footer">
          {props.profesional.habilidades.map((item, i) => (
            <span key={i}><b>{item + "; "}</b></span>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default CardProfesional;