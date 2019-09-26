import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import AttachmentIcon from '@material-ui/icons/Attachment';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';

class MenuUsuario extends Component {
  state = {
    profesionales: [
      {
        nombre: 'Mi perfil',
        linkTo: '/perfil',
        icon: <PersonIcon />
      },
      {
        nombre: 'Mi curriculum',
        linkTo: '/curriculum',
        icon: <AttachmentIcon />
      },
      {
        nombre: 'Mis empleos',
        linkTo: '/mis_empleos',
        icon: <WorkOutlineIcon />
      },
      {
        nombre: 'Buscar empleos',
        linkTo: '/buscar_empleos',
        icon: <SearchIcon />
      }
    ],
    empleadores: [
      {
        nombre: 'Buscar profesionales',
        linkTo: '/buscar_profesionales',
        icon: <SearchIcon />
      },
      {
        nombre: 'Crear empleo',
        linkTo: '/crear_empleo',
        icon: <LibraryAddIcon />
      },
      {
        nombre: 'Gestionar empleos',
        linkTo: '/gestionar_empleos',
        icon: <AssignmentIcon />
      },
      {
        nombre: 'Mi perfil',
        linkTo: '/perfil',
        icon: <PersonIcon />
      }
    ]
  }

  isActive = (value) => (this.props.location.pathname === value ? 'dropdown-item Active' : 'dropdown-item')

  cargarOpciones = () => {
    var opciones = [];
    if (this.props.usuario) {
      if (this.props.usuario.esProfesional) {
        this.state.profesionales.map((item, i) => {
          return opciones.push(
            <Link key={i} className={this.isActive(item.linkTo)} to={item.linkTo} style={styles.link}>
              {item.icon}
              <div className="ml-2">{item.nombre}</div>
            </Link>
          )
        })
      } else {
        this.state.empleadores.map((item, i) => {
          return opciones.push(
            <Link key={i} className={this.isActive(item.linkTo)} to={item.linkTo}>{item.nombre}</Link>
          )
        })
      }
    }
    return opciones.map(item => {
      return item;
    })
  }

  render() {
    return (
      <div className="nav-item dropleft">
        <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" href="" role="button" aria-haspopup="true" aria-expanded="false">{this.props.usuario.nombre}</a>
        <div className="dropdown-menu">
          {this.cargarOpciones()}
        </div>
      </div>
    )
  }
}

const styles = {
  link: {
    display: 'flex',
    alignItems: 'center'
  }
}

export default withRouter(MenuUsuario);