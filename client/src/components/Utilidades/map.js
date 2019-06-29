import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

class Map extends React.Component {
  render() {
    return (
      <LeafletMap
        center={[-34.904452, -57.926755]}
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
        <Marker position={[-34.904452, -57.926755]}>
          <Popup>
            UTN FRLP
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

export default Map;