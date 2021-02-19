import react from 'react';
import { GoogleApiWrapper, Map } from 'google-maps-react';
const mapKey = require('../../config/keys').googleMaps;

const SpotMap = ({google}) => {
  const style = {
    width: '50%',
    height: '50%',
    position: 'relative'
  }
  return (
    <div>
      <Map style={style} zoom={14} initialCenter={{lat: 38.445537055210195, lng: -122.7586518790954}} google={google}></Map>
    </div>
  )
}

export default GoogleApiWrapper({ apiKey: mapKey})(SpotMap)