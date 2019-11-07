import React from 'react';
import { Paper } from '@material-ui/core';
import Modal from '../../Utilidades/modal';
import TrabajoDetalle from './trabajo_detalle';
import { connect } from 'react-redux';

const Trabajo = (props) => {

  return (
    <Paper className="col-md" style={{padding: 7, margin: 10, cursor: 'pointer'}}>
      <Modal
        id={`modal${props.trabajo._id}`}
        title={props.trabajo.titulo}
        body={<TrabajoDetalle habilidades={props.trabajo.habilidadesRequeridas} descripcion={props.trabajo.descripcion}/>}
        footer={
          <button 
            className="btn btn-lg btn-outline-info"
            onClick={() => props.postular(props.trabajo._id)}
            data-dismiss="modal" aria-label="Close"
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