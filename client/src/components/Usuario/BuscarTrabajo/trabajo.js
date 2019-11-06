import React from 'react';
import { Paper } from '@material-ui/core';
import Modal from '../../Utilidades/modal';
import TrabajoDetalle from './trabajo_detalle';
import { agregarPostulante } from '../../../redux/actions/trabajo_actions';
import { connect } from 'react-redux';

const Trabajo = (props) => {
  const postular = () => {
    var dataToSubmit = {
      "id": props.trabajo._id,
      "candidato": props.candidato
    }
    props.dispatch(agregarPostulante(dataToSubmit, [])).then(res => console.log(res));
  }

  return (
    <Paper className="col-md" style={{padding: 7, margin: 10, cursor: 'pointer'}}>
      <Modal
        id={`modal${props.trabajo._id}`}
        title={props.trabajo.titulo}
        body={<TrabajoDetalle habilidades={props.trabajo.habilidadesRequeridas} descripcion={props.trabajo.descripcion}/>}
        footer={
          <button 
            className="btn btn-lg btn-outline-info"
            onClick={() => postular()}
          >
            Postularme
          </button>
        }
      >
        <div className="row">
          <div className="col-md-4">
            <img className="img-fluid" src={props.trabajo.creador.fotoDePerfil} alt="img"/>
          </div>
          <div className="col-md-8">
            <h3>{props.trabajo.titulo}</h3>
            <h5 className="text-secondary">{props.trabajo.creador.nombre + " " + props.trabajo.creador.apellido}</h5>
          </div>
        </div>
      </Modal>
    </Paper>
    
  )
}

export default connect()(Trabajo);