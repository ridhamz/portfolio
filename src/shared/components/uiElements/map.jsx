import React, { Fragment } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

import './map.css';

const MapBox = (props) => {
    return (
        <Fragment>
            <Map
                google={props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176 }}
            />
        </Fragment>
    );
}

const mapStyles = {
    width: '97%',
    height: '50%',
};

export default GoogleApiWrapper({
    apiKey: 'TOKEN HERE'
})(MapBox);