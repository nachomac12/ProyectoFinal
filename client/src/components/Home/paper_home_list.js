import React from 'react';
import PaperHome from './paper_home';
import Work from '@material-ui/icons/WorkOutline'
import Search from '@material-ui/icons/Search';
import Description from '@material-ui/icons/DescriptionOutlined';
import People from '@material-ui/icons/SupervisorAccount';
import Person from '@material-ui/icons/PersonOutline';
import ListAlt from '@material-ui/icons/ListAlt';
import ThumbsUpDown from '@material-ui/icons/ThumbsUpDown';

const PaperHomeList = () => {
  return (
    <div>
      <div style={{opacity: '0.6', backgroundColor: 'white', borderTop: '1px solid #637FE5', borderBottom:'1px solid #637FE5'}}>
        <h2 style={{textAlign: 'center', color: '#637FE5', opacity: '1', fontWeight: 'bolder', marginLeft: 10, paddingTop: 10}}>PROFESIONALES</h2>
      </div>
      <div className="row" style={{margin: 30}}>
        <div className="col-md-3 mb-1">
          <PaperHome
            titulo="Tu currículum"
            icono={<Description style={{fontSize: 90}}/>}
            texto="Se autogenerará un currículum en tu perfil. A medida que vayas cargando información este 
            se va a ir autocompletando. En el aparecerá tu foto de perfil, tus datos personales, tus habilidades,
            tu historial de trabajo y datos de contacto. Tu currículum será una herramienta de evaluación para que
            los empleadores puedan contratarte."
            linkTo="/curriculum"
          />
        </div>
        <div className="col-md-3 mb-1">
          <PaperHome
            titulo="Buscar trabajos"
            icono={<Search style={{fontSize: 100}}/>}
            texto="Podrás buscar trabajos en base a las capacidades que poseas. Para esto deberás cargar
            la información necesaria en tu perfil. En base a las habilidades que selecciones podrás postularte 
            a los trabajos que hayan generado diferentes empleadores, ya sean empresas o personas que 
            tienen una necesidad específica que tu puedes solucionar."
            linkTo="/buscar_empleos"
          />
        </div>
        <div className="col-md-3 mb-1">
          <PaperHome
            titulo="Historial de trabajos"
            icono={<ListAlt style={{fontSize: 90}}/>}
            texto="Si has sido contratado a un trabajo podrás tener un registro de los mismos, pudiendo añadir 
            trabajos que ya hayas realizado con anterioridad fuera de esta plataforma para que sean mostrados
            dentro de tu curriculum y de esta manera demostrar que tienes experiencia."
            linkTo="/mis_empleos"
          />
        </div>
        <div className="col-md-3 mb-1">
          <PaperHome
            titulo="Acepta o rechaza empleos"
            icono={<ThumbsUpDown style={{fontSize: 80}}/>}
            texto="Los empleadores pueden buscar profesionales para realizar trabajos y podrían enviarte una
            solicitud de empleo. De suceder esto llegará una notificación a tu perfil, pudiendo aceptarla o 
            recharzarla. Al aceptarla serás un postulante al empleo y podrías ser seleccionado para ejercerlo."
            linkTo="/perfil"
          />
        </div>
      </div>

      <div style={{opacity: '0.6', backgroundColor: 'white', borderTop: '1px solid #637FE5', borderBottom:'1px solid #637FE5'}}>
        <h2 style={{textAlign: 'center', color: '#637FE5', opacity: '1', fontWeight: 'bolder', marginLeft: 10, paddingTop: 10}}>EMPLEADORES</h2>
      </div>
      <div className="row justify-content-center" style={{margin: 30}}>
        <div className="col-md-3 mb-1">
          <PaperHome 
            titulo="Publicar trabajos"
            icono={<Work style={{fontSize: 100}}/>}
            texto="Si tienes una necesidad puedes publicar trabajos para que otras personas capacitadas
            puedan aplicar y solucionar tu demanda. Tendrás varios solicitantes al puesto y podrás evaluar
            cual es el profesional adecuado para solucionar tu problemática o llevar a cabo el negocio que
            quieres realizar."
            linkTo="/crear_empleo"
          />
        </div>
        <div className="col-md-3 mb-1">
          <PaperHome
            titulo="Encontrar profesionales"
            icono={<Person style={{fontSize: 100}}/>}
            texto="Podrás buscar profesionales y enviarles una solicitud de postulación la cual puede ser. 
            aceptada o rechazada por el profesional. En la búsqueda vas a poder filtrar por las habilidades
            que pretendes que tengan los trabajadores y/o por ciudad."
            linkTo="/buscar_profesionales"
          />
        </div>
        <div className="col-md-3 mb-1">
          <PaperHome
            titulo="Gestionar postulantes"
            icono={<People style={{fontSize: 100}}/>}
            texto="Una vez que hayas creado y publicado un trabajo, podrás gestionar la cantidad de personas
            a postularse al mismo pudiendo evaluar su aptitudes personales y quedarte con el que
            consideres mas apto para el puesto."
            linkTo="/gestionar_empleos"
          />
        </div>   
      </div>
    </div>
  )
}

export default PaperHomeList;