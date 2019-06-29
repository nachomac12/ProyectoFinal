import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from 'react-router-dom';
import '../Main/main.css';

export default () => (
  <Carousel 
    autoPlay={true} 
    infiniteLoop={true} 
    showThumbs={false} 
    showStatus={false} 
    useKeyboardArrows={true}
  >
    <div>
      <img style={{opacity: '0.6'}} 
        src="/images/fotolibu2.jpg" alt="img" />
        <div className="col-md-5 FotoUno">
          <h1 className="TextoHome">Emprende tu camino como profesional</h1>
          <p>Crea una cuenta y de esa manera podrás obtener trabajos, así como también
          gestionarlos y tener un feedback con las personas o empresas que te contraten</p>
          <Link to="/registro_profesional" className="btn btn-info btn-lg">Registrarme como profesional</Link>
        </div>
    </div>
    <div>
      <img style={{opacity: '0.6'}} 
        src="/images/fotolibu3.jpg" alt="img" />
        <div className="col-md-5 FotoDos">
          <h1 className="TextoHome">Contrata profesionales para realizar un trabajo</h1>
          <p>Si tienes la necesidad de contar con algún profesional para resolver tu demanda personal o
            empresarial puedes registrarte como Empleador y de esa manera contratar a los trabajadores aptos
            para la labor que requieres.</p>
          <Link to="/registro_empleador" className="btn btn-info btn-lg">Registrarme como empleador</Link>
        </div>
    </div>
  </Carousel>
);
