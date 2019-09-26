import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { AddCircleOutline, DoneOutlineRounded, CancelRounded } from '@material-ui/icons';

class TrabajoPostular extends Component {
  state = {
    seleccionar: false,
    color: "#3F8FB9",
    icon: <AddCircleOutline style={{fontSize: 50, color: '#ffffff', cursor: 'pointer'}}/>
  }

  componentDidMount() {
    this.props.postulado.then(res => {
      if (res) {
        this.setState({
          color: "#3FB96A",
          icon: <DoneOutlineRounded style={{fontSize: 50, color: '#ffffff', cursor: 'pointer'}}/>,
          seleccionar: true
        })
      }
    })
  }

  seleccionar = () => {
    this.setState({
      color: "#3FB96A",
      icon: <DoneOutlineRounded style={{fontSize: 50, color: '#ffffff', cursor: 'pointer'}}/>,
      seleccionar: true
    })
    this.props.postular(this.props.idTrabajo, this.props.usuarioID)
  }

  deseleccionar = () => {
    this.setState({
      color: "#3F8FB9",
      icon: <AddCircleOutline style={{fontSize: 50, color: '#ffffff', cursor: 'pointer'}}/>,
      seleccionar: false
    })
    this.props.despostular(this.props.idTrabajo, this.props.usuarioID)
  }

  iconoOver = () => {
    this.setState({
      icon: <CancelRounded style={{fontSize: 50, color: "#ffffff", cursor: 'pointer'}} />
    })
  }

  iconoOut = () => {
    setTimeout(() => {
      this.setState({
        icon: <DoneOutlineRounded style={{fontSize: 50, color: '#ffffff', cursor: 'pointer'}}/>
      })  
    }, 100);
    
  }

  render() {
    return (
      <Paper style={{padding: 20, backgroundColor: this.state.color, margin: 10, textAlign: 'left'}}>
        <div className="row">
          <div className="col-md-11">
            <div style={{fontSize: 30, color: '#ffffff'}}>{this.props.titulo}</div>
          </div>
          <div className="col-md-1">
            {!this.state.seleccionar ?
              <div onClick={() => this.seleccionar()}>
                {this.state.icon}
              </div>
            : <div 
                onClick={() => this.deseleccionar()} 
                onPointerOver={() => this.iconoOver()}
                onPointerOut={() => this.iconoOut()}
              >
                {this.state.icon}
              </div>
            }
          </div>
        </div>
      </Paper>
    )
  }
}

export default TrabajoPostular;