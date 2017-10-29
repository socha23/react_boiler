import React from 'react'
import GoogleMapReact from 'google-map-react';
import HeightExpander from '../common/components/HeightExpander'
import {Marker} from './Marker'

const API_KEY = 'AIzaSyC77HrEgEXqjx73wgVDrHCuLQwmHPVUx0k';

const GoogleMap = ({locators}) =>
    <HeightExpander style={{border: "1px solid #BBB"}}>
        <GoogleMapReact
            bootstrapURLKeys={{key: API_KEY}}
            center={{lat: 59.955413, lng: 30.337844}}
            zoom={8}
        >
            <Marker lat={59.955413}
                    lng={30.337844}
                    dotCorrection={-1}
                    name="MArker"/>
        </GoogleMapReact>
    </HeightExpander>;

export default GoogleMap