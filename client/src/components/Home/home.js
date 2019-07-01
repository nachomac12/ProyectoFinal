import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carousel from './carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PaperHome from './paper_home';
import Work from '@material-ui/icons/WorkOutline'
import Search from '@material-ui/icons/Search';
import Description from '@material-ui/icons/DescriptionOutlined';
import People from '@material-ui/icons/SupervisorAccount';

class Home extends Component {
  render() {
    return (
      <div>
        <div style={{marginTop: 3}}>
          <Carousel/>
        </div>
        <div className="row" style={{marginTop: 30, marginBottom: 30}}>
          <div className="col-md-3 mb-1">
            <PaperHome 
              titulo="Publicar trabajos"
              icono={<Work style={{fontSize: 100}}/>}
              texto="Si tienes una necesidad puedes publicar trabajos para que otras personas capacitadas
              puedan aplicar y solucionar tu demanda. Tendrás varios solicitantes al puesto y podrás evaluar
              cual es el profesional adecuado para solucionar tu problemática o llevar a cabo el negocio que
              quieres realizar."
              linkTo="/registro_empleador"
            />
          </div>
          <div className="col-md-3 mb-1">
            <PaperHome
              titulo="Encontrar trabajos"
              icono={<Search style={{fontSize: 100}}/>}
              texto="Podrás buscar trabajos en base a las capacidades que poseas. Para esto deberás cargar
              la información necesaria en tu perfil. En base a las habilidades que selecciones podrás aplicar 
              a los trabajos que hayan generado diferentes empleadores, ya sean empresas o personas que 
              tienen una demanda particular."
              linkTo="/registro_profesional"
            />
          </div>
          <div className="col-md-3 mb-1">
            <PaperHome
              titulo="Gestionar postulantes"
              icono={<People style={{fontSize: 100}}/>}
              texto="Una vez que hayas creado y publicado un trabajo, podrás gestionar la cantidad de personas
              que se pueden postular al mismo. De cada una de estas personas vas a poder evaluar sus aptitudes
              para decidir cual es el más capaz para desarrollar tu trabajo. Para esto tendrás acceso a sus
              habilidades y a su currículum."
              linkTo="/registro_empleador"
            />
          </div>   
          <div className="col-md-3 mb-1">
            <PaperHome
              titulo="Tu currículum"
              icono={<Description style={{fontSize: 90}}/>}
              texto="Se autogenerará un currículum en tu perfil. A medida que vayas cargando información este 
              se va a ir autocompletando. En el aparecerá tu foto de perfil, tus datos personales, tus habilidades,
              tu historial de trabajo y datos de contacto. Tu currículum será una herramienta de evaluación para 
              quedar en un trabajo."
              linkTo="/registro_profesional"
            />
          </div>    
        </div>
      </div>
    )
  }
}

export default Home;