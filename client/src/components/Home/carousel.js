import React from "react";
import { Link } from "react-router-dom";
import "./carousel.css";
import LeftArrow from "@material-ui/icons/KeyboardArrowLeft";
import RightArrow from "@material-ui/icons/KeyboardArrowRight";

export default () => (
  <div id="carouselHome" className="carousel slide" data-keyboard={true} data-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <div className="FotoUno col-md-5">
          <h1 className="TextoHome">Emprende tu camino como profesional</h1>
          <p>Crea una cuenta y de esa manera podrás obtener trabajos, así como también
          gestionarlos y tener un feedback con las personas o empresas que te contraten</p>
          <Link to="/registro_profesional" className="btn btn-info btn-lg btnCarouselUno">Registrarme como profesional</Link>
        </div>
        <img className="d-block w-100" src="/images/fotolibu2.jpg" alt="img"/>
      </div>
      <div className="carousel-item">
        <div className="FotoDos col-md-5">
          <h1 className="TextoHome">Contrata profesionales para realizar un trabajo</h1>
          <p>Si tienes la necesidad de contar con algún profesional para resolver tu demanda personal o
            empresarial puedes registrarte como Empleador y de esa manera contratar a los trabajadores aptos
            para la labor que requieres.</p>
          <Link to="/registro_empleador" className="btn btn-info btn-lg btnCarouselDos">Registrarme como empleador</Link>
        </div>
        <img className="d-block w-100" src="/images/fotolibu3.jpg" alt="img" />
      </div>
    </div>
    <a
      className="carousel-control-prev"
      href="#carouselHome"
      role="button"
      data-slide="prev"
    >
      <div className="LeftArrow"><LeftArrow id="LeftArrowIcon"/></div>
    </a>
    <a
      className="carousel-control-next"
      href="#carouselHome"
      role="button"
      data-slide="next"
    >
      <div className="RightArrow"><RightArrow id="RightArrowIcon"/></div>
    </a>
  </div>
);
