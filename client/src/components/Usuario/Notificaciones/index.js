import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { IconButton, Badge, Divider } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import { connect } from 'react-redux';
import { listarNotificacionesUsuario, verNotificacion } from '../../../redux/actions/trabajo_actions';

class BadgeNotificaciones extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    this.props.dispatch(listarNotificacionesUsuario())
      .then(() => this.setState({loading: false}))
  }

  listarNotificaciones = () => {
    if (!this.state.loading) {
      return this.props.trabajo.notificaciones.map(notif => {
        if (!notif.vista) {
          return (
            <div 
              key={notif._id}
              className="bg-light" style={{margin: 3, cursor: 'pointer'}}
              onClick={() => this.verNotif(notif._id)}
            >
              <div style={{margin: 1}}>
                {notif.titulo}
              </div>
              <Divider/>
            </div>
          )
        } else {
          return (
            <div 
              style={{margin: 3, cursor: 'pointer'}} 
              key={notif._id}
              onClick={() => this.detalleNotif(notif._id)}
            >
              <div style={{margin: 1}}>
                {notif.titulo}
              </div>
              <Divider/>
            </div>
  )}})}}

  verNotif = (notifID) => {
    var dataToSubmit = {"id": notifID};
    this.props.dispatch(verNotificacion(this.props.trabajo.notificaciones, dataToSubmit));
    this.detalleNotif(notifID);
  }

  detalleNotif = (notifID) => {
    this.props.history.push(`/notificacion/${notifID}`);
  }

  contarNotif = () => {
    var contarNotif = 0;
    if (!this.state.loading) {
      this.props.trabajo.notificaciones.map(notif => {
        if (!notif.vista) {
          contarNotif = parseInt(contarNotif) + 1
          return contarNotif;
        }
        return contarNotif;
      })
    }
    return contarNotif;
  }

  render() {
    return (
      <div>
        <div className="dropdown dropleft">
          <a className="dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <IconButton>
              <Badge badgeContent={this.contarNotif()} color="secondary">
                <Notifications fontSize="small" color="primary"/>
              </Badge>
            </IconButton>
          </a>
          <div className="dropdown-menu" style={{width: 220}}>
            {this.listarNotificaciones()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    trabajo: state.trabajo
  }
}

export default connect(mapStateToProps)(withRouter(BadgeNotificaciones));