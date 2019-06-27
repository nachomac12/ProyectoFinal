import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from 'react-router-dom';
import '../Main/main.css';

export default () => (
  <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false} useKeyboardArrows={true}>
    <div>
      <img style={{opacity: '0.6'}} 
        src="/images/fotolibu3.jpg" alt="img" />
        <div className="col-md-5 FotoUno">
          <h1 className="TituloFotoUno">Emprende tu camino como profesional</h1>
          <p>Crea una cuenta y de esa manera podras obtener trabajos, así como también
          gestionarlos y tener un feedback con las personas o empresas que te contraten</p>
          <Link to="/registro_profesional" className="btn btn-info btn-lg">Registrarme como profesional</Link>
        </div>
    </div>
    <div>
      <img src="/images/fotolibu1.jpg" alt="img" />
    </div>
    <div>
      <img src="/images/fotolibu2.jpg" alt="img" />
    </div>
  </Carousel>
);
