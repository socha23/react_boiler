import React from 'react'
import GoogleMapReact from 'google-map-react';


const API_KEY = 'AIzaSyC77HrEgEXqjx73wgVDrHCuLQwmHPVUx0k';

const GoogleMap = ({locators}) =>
        <div style={{height: 500}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: API_KEY}}
                center={{lat: 43.604363, lng: 1.443363}}
                zoom={8}

            />
        </div>;

export default GoogleMap