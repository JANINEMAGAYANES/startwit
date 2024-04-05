import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import { IconButton } from '@chakra-ui/react';


const CLOSEUP_ZOOM = 13;
const FLY_DURATION = 0.7;

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
    const map = useMapEvents({})
    return <Marker position={position} icon={issueIcon} eventHandlers={{
        click: () => {
            map.flyTo({ lat: position[0], lng: position[1] }, CLOSEUP_ZOOM, {duration: 0.7});
            onPick(id)
        },
    }} />
}

function LocateControl() {
    const map = useMapEvents({
        locationfound(e) {
            map.flyTo(e.latlng, CLOSEUP_ZOOM, {duration: FLY_DURATION});

        },
    })

    return <div className={'leaflet-top leaflet-right'} onClick={() => map.locate()}>
        <IconButton className="leaflet-control leaflet-bar" icon={<i class="fa-solid fa-location-crosshairs"></i>}>
        </IconButton>
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
        style={{ height: '100%', zIndex: 0 }}
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