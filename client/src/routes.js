import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Permisos from './components/Usuario/permisos_de_usuario';

import Home from './components/Home/home';
import Main from './components/Main';
import Registro from './components/Registro_Ingresar/registro';
import Ingresar from './components/Registro_Ingresar/ingresar';
import RegistroProfesional from './components/Registro_Ingresar/registro_profesional';
import RegistroEmpleador from './components/Registro_Ingresar/registro_empleador';
import Perfil from './components/Usuario/perfil';
import ModificarPerfilProfesional from './components/Usuario/Profesional/modificar_perfil_profesional';

const Routes = () => {
  return (
    <Main>
      <Switch>
        <Route path="/" exact component={Permisos(Home, null)} />
        <Route path="/registro" exact component={Permisos(Registro, false)} />
        <Route path="/ingresar" exact component={Permisos(Ingresar, false)} />
        <Route path="/registro_profesional" exact component={Permisos(RegistroProfesional, false)} />
        <Route path="/registro_empleador" exact component={Permisos(RegistroEmpleador, false)} />

        <Route path="/perfil" exact component={Permisos(Perfil, true)} />
        <Route path="/modificar_profesional" exact component={Permisos(ModificarPerfilProfesional, true)} />
      </Switch>
    </Main>
  )
}

export default Routes;
