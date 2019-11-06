import React, { useState, useEffect } from 'react';
import { Card, CardContent, Divider } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const NotificacionDetalle = (props) => {
  const id = props.match.params.id;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    titulo: '',
    mensaje: '',
    empresa: '',
    descripEmpleo: '',
    telEmpleador: '',
    emailEmpleador: ''
  });

  useEffect(() => {
    axios.get(`/api/trabajos/notificacion?id=${id}`)
    .then(res => res.data)
    .then(res => {
        setLoading(true);
        setData({
          titulo: res.titulo,
          mensaje: res.mensaje,
          empresa: res.creador.nombre + ' ' + res.creador.apellido,
          descripEmpleo: res.trabajoAsociado.descripcion,
          telEmpleador: res.creador.telefono,
          emailEmpleador: res.creador.email
        })
    })
  }, [data, id]);

  return (
    loading ?
    <div 
      className="col-md-8"
      style={{padding: 10, margin: '0 auto'}}
    >
      <Card>
        <CardContent>
          <h2 className="text-primary mt-2">{data.titulo}</h2>
          <h4 className="text-secondary ml-1">{data.empresa}</h4>
          <Divider />
          <p className="ml-1 mt-3">{data.mensaje}</p>
          <Divider />
          <p className="ml-1 mt-3">
            <span className="font-weight-bold">Descripción del empleo:</span>
            <span className="font-italic"> {data.descripEmpleo}</span>
          </p>
          <Divider />
          <h6 className="ml-1 mt-3 font-weight-bold">Contacto</h6>
          <p className="ml-1 mt-3">Telefono: {data.telEmpleador}</p>
          <p className="ml-1 mt-3">Email: {data.emailEmpleador}</p>
        </CardContent>
      </Card>
    </div>
    : null
  )
}

export default withRouter(NotificacionDetalle);