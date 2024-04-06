import 'leaflet/dist/leaflet.css';
import { useCallback, useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, useMapEvents, Marker, Circle } from 'react-leaflet';
import { IconButton } from '@chakra-ui/react';
import { INCIDENT_ICONS } from '../constants';


const CLOSEUP_ZOOM = 13;
const FLY_DURATION = 0.7;

const issueIcons = Object.fromEntries(Object.entries(INCIDENT_ICONS).map(([label, icon]) => {
    return [label, L.divIcon({
        html: `<span style="font-size: 2em; background-color: white; border: 1px solid; border-radius: 100%; width: 34px; height: 40px; z-index: -1">${icon}</span>`,
        iconSize: [20, 20],
        className: ''
    })]
}));

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

function IssueMarker({ id, position, category, onPick = null }) {
    const map = useMapEvents({});

    const selectMarker = useCallback((() => {
        map.flyTo({ lat: position[0], lng: position[1] }, CLOSEUP_ZOOM, { duration: 0.7 });
        onPick(id);
    }), [id, map, onPick, position]);

    return <Marker position={position} icon={issueIcons[category] ?? issueIcon} eventHandlers={{
        click: selectMarker,
    }} />
}

function LocateControl() {
    const map = useMapEvents({
        locationfound(e) {
            map.flyTo(e.latlng, CLOSEUP_ZOOM, { duration: FLY_DURATION });

        },
    })

    return <div className={'leaflet-top leaflet-right'} onClick={() => map.locate()}>
        <IconButton className="leaflet-control leaflet-bar" icon={<i className="fa-solid fa-location-crosshairs"></i>}>
        </IconButton>
    </div>;

}

function PinLocation({ onChangeLocation }) {
    const [location, setLocation] = useState();
    const map = useMapEvents({
        locationfound({ latlng }) {
            setLocation(latlng);
            onChangeLocation(latlng);
        },
    });

    useEffect(() => { map.locate() }, [map]);

    return location ? <Marker position={location} icon={mapPinIcon} draggable={true} zIndexOffset={10} eventHandlers={{
        dragend: (event) => {
            const newMarkerPosition = event.target.getLatLng();
            setLocation([newMarkerPosition.lat, newMarkerPosition.lng]);
            onChangeLocation([newMarkerPosition.lat, newMarkerPosition.lng]);
        },
    }}>

    </Marker> : null;

}

export default function Map({ center = null, zoom = 10, markers = [], onPickMarker, onChangeLocation }) {
    const bounds =[[12,51 ], [13, 52]]
      
    return <MapContainer
        style={{ height: '100%', zIndex: 0 }}
        center={[38, 139.69222]}
        zoom={6}
        minZoom={3}
        maxZoom={19}
        maxBounds={[[-85.06, -180], [85.06, 180]]}
        scrollWheelZoom={true}
        zoomControl={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Circle center={[52.392266067801614, 13.12520444729924]} pathOptions={{ fillColor: 'blue' }} radius={200} />

        {markers.map((marker) => <IssueMarker key={marker.id} {...marker} onPick={onPickMarker} />)}
        <PinLocation onChangeLocation={onChangeLocation} />
        <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
      {/* Removed stroke attribute */}
      <rect x="0" y="0" width="100%" height="100%" fill="none"  stroke="none"/>
      <circle r="30" cx="40" cy="40" fill="rgba(255, 0, 0, 0.5)" />
    
    </SVGOverlay>
        <LocateControl />
    </MapContainer>
}