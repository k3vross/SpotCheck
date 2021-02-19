import { GoogleApiWrapper } from 'google-maps-react';
import React from 'react';
import SpotMap from '../map/map';


const Dashboard = () => {
  return (
    <div>
      <h1>Welcome Person</h1>
      <SpotMap />
    </div>
  )
}

export default Dashboard
