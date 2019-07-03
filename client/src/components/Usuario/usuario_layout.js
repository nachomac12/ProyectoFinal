import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PersonIcon from '@material-ui/icons/Person';
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
    estiloLink: "LinkItem",
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
      }
    ]
  }

  isActive = (value) => (this.props.location.pathname === value ? 'Active' : '')

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
            <Link 
              to={item.linkTo} 
              className='LinkItem'
              key={i}
            > 
              <ListItem button>
                  <ListItemIcon className={this.isActive(item.linkTo)}>{item.icon}</ListItemIcon>
                  <ListItemText><span className={this.isActive(item.linkTo)}>{item.nombre}</span></ListItemText>
              </ListItem>
            </Link>
          )
        })
      } else {
        this.state.empleadores.map((item, i) => {
          return opciones.push (
            <Link 
              to={item.linkTo} 
              className='LinkItem'
              key={i}
            > 
              <ListItem button>
                  <ListItemIcon className={this.isActive(item.linkTo)}>{item.icon}</ListItemIcon>
                  <ListItemText><span className={this.isActive(item.linkTo)}>{item.nombre}</span></ListItemText>
              </ListItem>
            </Link>
          )
        })
      }
    }
    return opciones.map(item => {
      return item;
    })
  }

  render() {
    console.log(this.props)
    return (
      <div className="row">
        <div className="col-md-1 m-2">
          <IconButton
            style={{color: '#17a2b8', background: 'transparent'}}
            aria-label="Open drawer"
            edge="start"
            onClick={this.openDrawer}
          >
            Menú
            <ChevronRightIcon fontSize="large" style={{paddingTop: '1px'}}/>
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
        <div className="col-md m-2">
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

export default connect(mapStateToProps)(withRouter(UsuarioLayout));
