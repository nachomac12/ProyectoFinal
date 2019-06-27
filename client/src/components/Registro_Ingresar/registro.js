import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Registro extends Component {
  render() {
    return (
      <div className="row justify-content-center m-3">
        <div className="col-md-4">
          <Link to="/registro_profesional" className="btn btn-primary btn-lg">
            Emprendé tu camino como profesional
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/registro_empleador" className="btn btn-info btn-lg">
            Conseguí profesionales para realizar tus trabajos
          </Link>
        </div>
      </div>
    )
  }
}

export default Registro;