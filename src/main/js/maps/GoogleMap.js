import React from 'react'
import GoogleMapReact from 'google-map-react';
import HeightExpander from '../common/components/HeightExpander'
import {LabelMarker} from './Marker'

const API_KEY = 'AIzaSyC77HrEgEXqjx73wgVDrHCuLQwmHPVUx0k';

const WARSAW = {
    lat: 52.2297,
    lng: 21.0122
};
const DEFAULT_ZOOM = 12;

const GoogleMap = ({locators, selected, onClick, onClickMap = () => {}}) =>
    <HeightExpander style={{border: "1px solid #BBB"}}>
        <GoogleMapReact
            bootstrapURLKeys={{key: API_KEY}}
            center={WARSAW}
            zoom={DEFAULT_ZOOM}
            onClick={onClickMap}
        >
            {locators.map(t =>
                <LabelMarker
                    key={t.id}
                    lat={t.location.latitude}
                    lng={t.location.longitude}
                    name={t.name}
                    color="#337ab7"
                    selected={selected && t.id == selected.id}
                    onClick={() => onClick(t)}
                />
                )}
        </GoogleMapReact>
    </HeightExpander>;

export default GoogleMap