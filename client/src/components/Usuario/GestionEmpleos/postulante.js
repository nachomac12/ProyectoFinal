import React, { Component } from 'react'
import { Card, CardContent, CardMedia } from '@material-ui/core';

class Postulante extends Component {
  
  render() {
    return (
      <Card style={{display: 'flex'}}>
        <CardMedia
          style={{width: 151}}
          image={this.props.foto}
          title="Foto de perfil"
        />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <CardContent>
            <h4>{this.props.nombre + " " + this.props.apellido}</h4>
            <h5 className="text-secondary">{this.props.email}</h5>
            <h5 className="text-secondary">{this.props.telefono ? this.props.telefono : "Sin número"}</h5>
          </CardContent>
        </div>
      </Card>
    )
  }
}

export default Postulante;