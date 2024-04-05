import 'leaflet/dist/leaflet.css';
import { useCallback, useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';



const issueIcon = L.divIcon({
    html: '<span style="font-size: 3em; color: Tomato;"><i class="fa-solid fa-location-dot fa-xl"></i></span>',
    iconSize: [20, 20],
    className: ''
});

const mapPinIcon = L.divIcon({
    html: '<span style="font-size: 3em; color: Tomato;"><i class="fa-solid fa-map-pin"></i></span>',
    iconSize: [20, 20],
    className: ''
});

function IssueMarker({ id, position, popupConfig, onPick = null }) {
    return <Marker position={position} icon={issueIcon} eventHandlers={{
        click: () => {console.log('inner', id);onPick(id)},
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

function PinLocation() {
    const [location, setLocation] = useState();
    const map = useMapEvents({
        locationfound({ latlng }) {
            setLocation(latlng);
        },
    });
    useEffect(() => { map.locate() }, [map]);

    return location ? <Marker position={location} icon={mapPinIcon}>

    </Marker> : null;

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

        <PinLocation />
        {markers.map(({ id, ...marker }) => <IssueMarker key={id} {...marker} onPick={onPickMarker} />)}
        <LocateControl />
    </MapContainer>
}