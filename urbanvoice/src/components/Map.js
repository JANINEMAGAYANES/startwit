import 'leaflet/dist/leaflet.css';
import { useCallback, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';


function IssueMarker({ position, popupConfig, onPick = null }) {
    return <Marker position={position} eventHandlers={{
        click: onPick,
    }}>
        {popupConfig ? <Popup>{popupConfig.description}</Popup> : null}
    </Marker>
}

function LocateControl() {
    const map = useMapEvents({
        locationfound(e) {
            map.flyTo(e.latlng, 13);

        },
    })

    return <div className={'leaflet-top leaflet-right'} onClick={() => map.locate()}>
        <div className="leaflet-control leaflet-bar">Center</div>
    </div>;

}
export default function Map({ center = null, zoom = 10, markers = [], onPickMarker }) {
    return <MapContainer
        style={{ height: '100%' }}
        center={[38, 139.69222]}
        zoom={6}
        minZoom={3}
        maxZoom={19}
        maxBounds={[[-85.06, -180], [85.06, 180]]}
        scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

        {markers.map(({ id, ...marker }) => <IssueMarker key={id} {...marker} onPick={onPickMarker} />)}
        <LocateControl />
    </MapContainer>
}