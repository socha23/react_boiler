import React from 'react'
import GoogleMapReact from 'google-map-react';
import HeightExpander from '../common/components/HeightExpander'
import {Marker} from './Marker'

const API_KEY = 'AIzaSyC77HrEgEXqjx73wgVDrHCuLQwmHPVUx0k';

const WARSAW = {
    lat: 52.2297,
    lng: 21.0122
};
const DEFAULT_ZOOM = 12;

const GoogleMap = ({locators}) =>
    <HeightExpander style={{border: "1px solid #BBB"}}>
        <GoogleMapReact
            bootstrapURLKeys={{key: API_KEY}}
            center={WARSAW}
            zoom={DEFAULT_ZOOM}
        >
            {locators.map(t =>
                <Marker
                    key={t.id}
                    lat={t.latitude}
                    lng={t.longitude}
                    dotCorrection={-1}
                    name={t.name}
                />
                )}
        </GoogleMapReact>
    </HeightExpander>;

export default GoogleMap