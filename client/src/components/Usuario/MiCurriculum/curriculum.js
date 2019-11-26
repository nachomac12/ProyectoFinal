import React from "react";
import Divider from '@material-ui/core/Divider';

const Curriculum = props => {
  const listar = (lista, caso) => {
    if (lista) {
      switch (caso) {
        case "habilidad":
          if (lista.length > 0) {
            return lista.map((item, i) =>
              lista.length - 1 === i ? (
                <span key={i}>{item}.</span>
              ) : (
                <span key={i}>{item}, </span>
              )
            );
          } else return <p>No ha seleccionado habilidades.</p>;
        case "idioma":
          if (lista.length > 0) {
            return lista.map((item, i) => (
              <span key={i}>
                {item.idioma} {item.nivel}
                <br />
              </span>
            ));
          } else return <p>No ha seleccionado idiomas.</p>;
        case "educacion":
          if (lista.length > 0) {
            return lista.map((item, i) => (
              <div key={i} style={{ marginTop: 5 }}>
                <span>
                  <b>{item.instituto}, </b> {item.ciudad} -{" "}
                  <i>{item.titulo}</i>
                </span>
                <br />
                <span>{item.añoIngreso + " - " + item.añoEgreso}</span>
              </div>
            ));
          } else return <p>No ha ingresado su educación.</p>;
        default:
          return null;
      }
    }
  };

  return (
    <div>
      <div className="row mb-2">
        <div className="col-md-4">
          <img
            className="img-thumbnail"
            alt="img"
            src={props.usuario.fotoDePerfil}
          />
        </div>
        <div className="col-md">
          <div className="row">
            <div className="col-md">
              <h3>{props.usuario.nombre + " " + props.usuario.apellido}</h3>
              <h5 className="text-secondary">
                {props.profesional ? props.profesional.profesion : null}
              </h5>
            </div>
            <div className="col-md">
              {props.domicilio ? (
                <div className="text-right mr-1">
                  <p>
                    {props.domicilio.direccion}{" "}
                    {props.domicilio.piso ? (
                      <span>| Piso: {props.domicilio.piso}</span>
                    ) : null}
                  </p>
                  <p>
                    {props.domicilio.localidad}, {props.domicilio.provincia}
                  </p>
                  <p className="font-weight-bold">+54 {props.usuario.telefono}</p>
                  <p className="font-weight-bold">{props.usuario.email}</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <b>Descripcion personal</b> <br />
              <i>{props.usuario.descripcion}</i>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="row" style={{ margin: 20 }}>
        <div className="col-md mb-2">
          <h5 className="text-info">Experiencia</h5>
          <p>Desarrollador Fullstack en Samaproject (2013-2019)</p>
          <h5 className="text-info mt-4">Educación</h5>
          {listar(
            props.profesional ? props.profesional.educacion : null,
            "educacion"
          )}
        </div>
        <div className="col-md-3">
          <h5 className="text-info">Habilidades</h5>
          {listar(
            props.profesional ? props.profesional.habilidades : null,
            "habilidad"
          )}
          <h5 className="text-info mt-4">Idiomas</h5>
          {listar(props.profesional ? props.profesional.idiomas : null, "idioma")}
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
