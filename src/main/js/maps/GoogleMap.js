import React from 'react'
import GoogleMapReact from 'google-map-react';
import HeightExpander from '../common/components/HeightExpander'

const API_KEY = 'AIzaSyC77HrEgEXqjx73wgVDrHCuLQwmHPVUx0k';

const GoogleMap = ({locators}) =>
    <HeightExpander style={{border: "1px solid #BBB"}}>
        <GoogleMapReact
            bootstrapURLKeys={{key: API_KEY}}
            center={{lat: 43.604363, lng: 1.443363}}
            zoom={8}

        />
    </HeightExpander>;

export default GoogleMap