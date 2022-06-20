import {useControl} from 'react-map-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';


function DrawControl (props){
    draw = useControl(
    ({ map }) => {
      map.on('draw.create', props.onCreate || function(){});
      map.on('draw.update', props.onUpdate || function(){});
      map.on('draw.delete', props.onDelete || function(){});
      return new MapboxDraw(props);
    },
    {
      position: props.position
    },
  );

  return null;
};

export default DrawControl;
export let draw = null; 