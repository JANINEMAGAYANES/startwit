import React from 'react';
import Map from '../components/Map';

const Home = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column'}}>
      <h1>Home Screen</h1>
      <div style={{ flex: 1 }}>

        <Map center={[51.505, -0.09]} zoom={13} markers={[
          { id: '1', position: [51.505, -0.09], popupConfig: { description: 'Car crash' } }
        ]} onPickMarker={console.log} />
      </div>
    </div>
  );
};

export default Home;