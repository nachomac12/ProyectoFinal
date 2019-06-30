import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

class Map extends React.Component {
  render() {
    return (
      <LeafletMap
        center={[this.props.latitud, this.props.longitud]}
        zoom={15}
        maxZoom={15}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[this.props.latitud, this.props.longitud]}>
          <Popup>
            Universidad Tecnológica Nacional <br/> Facultad Regional La Plata
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

export default Map;