import React from 'react';
import Map from './map';

const Nosotros = () => {
    return (
        <div className="justify-content-center text-left" style={{padding: '30px'}}>
            <h4 className="text-info">Misión</h4>
            <p>Brindar nuevas tecnologías para agilizar, ordenar y efectivizar el mercado 
            laboral abarcado por diferentes profesionales tanto a nivel particular como empresarial.</p>
            <h4 className="text-info">Visión</h4>
            <p>Innovar tecnológicamente el mercado de profesionales en diferentes áreas del conocimiento 
            aportando un entorno confiable y actualizado en el cual dichos profesionales, empresas y 
            potenciales clientes interactúen entre sí para llevar adelante las actividades correspondientes 
            que el mercado demande. Para lograr este objetivo se llevará a cabo una aplicación web escalable 
            para estar en concordancia con las necesidades actuales y futuras.</p>
            <h4 className="text-info">Nuestra ubicación</h4>
            <Map 
                latitud={-34.904452}
                longitud={-57.926755}
            />
        </div>
    )
}

export default Nosotros;