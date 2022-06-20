import {useControl} from 'react-map-gl';
import MapboxGeocoder, {GeocoderOptions} from '@mapbox/mapbox-gl-geocoder';
import { useState } from "react";
import { Marker } from "react-map-gl";


function GeocoderControl(props) {  
    const [marker, setMarker] = useState(null);
    geocoder = useControl(
        () => {
          const ctrl = new MapboxGeocoder({
            ...props,
            marker: false,
            accessToken: props.mapboxAccessToken
          });
          // ctrl.on('query', props.onLoading);
          ctrl.on('results', props.onResults || function(){});
        //   ctrl.on('error', props.onError);
        
        ctrl.on('result', props.onResult || function(){});
          return ctrl;
        },
        {
        position: props.position
        },

    );
    return (<div style={{backgroundColor:"red"}}></div>);
  }

export default GeocoderControl;
export let geocoder = null; 