import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Permisos from './components/Usuario/permisos_de_usuario';
import NotFound from './components/Utilidades/not_found';
import Home from './components/Home/home';
import Main from './components/Main';
import Ingresar from './components/Registro_Ingresar/ingresar';
import RegistroProfesional from './components/Registro_Ingresar/registro_profesional';
import RegistroEmpleador from './components/Registro_Ingresar/registro_empleador';
import Perfil from './components/Usuario/MiPerfil';
import Nosotros from './components/Nosotros/nosotros';
import Curriculum from './components/Usuario/MiCurriculum';

const Routes = () => {
  return (
    <Main>
      <Switch>
        {/*RUTAS PUBLICAS*/}
        <Route path="/" exact component={Permisos(Home, null)} />
        <Route path="/ingresar" exact component={Permisos(Ingresar, false)} />
        <Route path="/registro_profesional" exact component={Permisos(RegistroProfesional, false)} />
        <Route path="/registro_empleador" exact component={Permisos(RegistroEmpleador, false)} />
        <Route path='/nosotros' exact component={Permisos(Nosotros, null)} />
        {/*RUTAS PRIVADAS*/}
        <Route path="/perfil" exact component={Permisos(Perfil, true)} />
        {/*RUTAS PROFESIONALES*/}
        <Route path="/curriculum" exact component={Permisos(Curriculum, true, true)} />
        {/*RUTAS EMPLEADOR*/}
        <Route component={Permisos(NotFound)} />
      </Switch>
    </Main>
  )
}

export default Routes;
