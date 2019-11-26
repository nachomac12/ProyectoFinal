import React from 'react';
import { Paper } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const Empleo = (props) => {
    return (
      <Paper className="col-md-8 mt-4">
      <div className="row align-items-center"> 
        <div className="col-md-4">
          <img className="img-fluid" src={props.foto} alt="img"/>
        </div>
        <div className="col-md-8">
          <h2 className="text-info">{props.titulo}</h2>
          <h3 className="text-secondary">{props.empresa}</h3>
        </div>
      </div>
        <div 
          style={{position: 'absolute', right: 8, bottom: 8, cursor: 'pointer'}} 
          onClick={() => props.despostular(props.id)}
        >
          <Delete fontSize="large" color="secondary"/>
        </div>
      </Paper>
    )
}

export default Empleo;