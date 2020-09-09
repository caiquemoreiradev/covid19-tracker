import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from '../../services/utils';

import './styles.css';

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="app__map">
      <LeafletMap className='leaflet__container' center={center} zoom={zoom}>
        <TileLayer 
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMao</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
    );
}

export default Map;