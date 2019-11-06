import React from 'react';
import { Divider, Chip } from '@material-ui/core';

const TrabajoDetalle = (props) => {
  const renderHabilidades = () => (
    props.habilidades.map((hab, i) => (
      <Chip style={{margin: 2}} label={hab} key={i}/>
    ))
  )

  return (
    <div style={{padding: 5}}>
      <p className="font-italic mt-2">{props.descripcion}</p>
      <Divider />
      <div style={{padding: 10}}>
        <h5 className="text-secondary">Habilidades requeridas para el puesto:</h5>
        {renderHabilidades()}
      </div>
    </div>
  )
}

export default TrabajoDetalle;