import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import AttachmentIcon from '@material-ui/icons/Attachment';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';

class UsuarioLayout extends Component {
  state = {
    open: false,
    profesionales: [
      {
        nombre: 'Mi Perfil',
        linkTo: '/perfil',
        icon: <PersonIcon />
      },
      {
        nombre: 'Mi Curriculum',
        linkTo: '/curriculum',
        icon: <AttachmentIcon />
      },
      {
        nombre: 'Mis Empleos',
        linkTo: '/mis_empleos',
        icon: <WorkOutlineIcon />
      },
      {
        nombre: 'Buscar Empleos',
        linkTo: '/buscar_empleos',
        icon: <SearchIcon />
      },
      {
        nombre: 'Modificar Perfil',
        linkTo: '/modificar_profesional',
        icon: <EditIcon />
      }
    ],
    empleadores: [
      {
        nombre: 'Mi Perfil',
        linkTo: '/perfil',
        icon: <PersonIcon />
      },
      {
        nombre: 'Crear Empleo',
        linkTo: '/crear_empleo',
        icon: <LibraryAddIcon />
      },
      {
        nombre: 'Gestionar Empleos',
        linkTo: '/gestionar_empleos',
        icon: <AssignmentIcon />
      },
      {
        nombre: 'Buscar Profesionales',
        linkTo: '/buscar_profesionales',
        icon: <SearchIcon />
      },
      {
        nombre: 'Modificar Perfil',
        linkTo: '/modificar_empleador',
        icon: <EditIcon />
      }
    ]
  }

  openDrawer = () => {
    this.setState({open: true})
  }

  closeDrawer = () => {
    this.setState({open: false})
  }

  cargarOpciones = () => {
    var opciones = [];
    if (this.props.usuario.usuarioDatos) {
      if (this.props.usuario.usuarioDatos.esProfesional) {
        this.state.profesionales.map((item, i) => {
          return opciones.push (
            <ListItem button key={i}>
              <Link 
                to={item.linkTo} 
                style={{verticalAlign: 'middle', 
                display: 'flex',
                textDecoration: 'none'}}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.nombre}</ListItemText>
              </Link>
            </ListItem>
          )
        })
      } else {
        this.state.empleadores.map((item, i) => {
          return opciones.push (
            <ListItem button key={i}>
              <Link 
                to={item.linkTo} 
                style={{verticalAlign: 'middle', 
                display: 'flex', 
                textDecoration: 'none'}}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.nombre}</ListItemText>
              </Link>
            </ListItem>
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
      <div className="row">
        <div className="col-md-2 m-2">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={this.openDrawer}
          >
            <MenuIcon fontSize="large"/>
          </IconButton>
          <Drawer open={this.state.open}>
            <IconButton onClick={this.closeDrawer} className="text-info" style={{background: 'transparent'}}>
              {this.state.open ? <ChevronLeftIcon fontSize="large"/> : <ChevronRightIcon fontSize="large"/>}
              Esconder
            </IconButton>
            <Divider />
            <List>
              {this.cargarOpciones()}
            </List>
          </Drawer>
        </div>
        <div className="col-md-8 m-2">
          {this.props.children}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    usuario: state.usuario
  }
}

export default connect(mapStateToProps)(UsuarioLayout);
