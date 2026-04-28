// components/MapComponent.tsx
'use client'; // Wajib untuk komponen yang berinteraksi dengan browser window

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Mendefinisikan tipe data untuk koordinat lokasi
export interface LocationData {
  lat: number;
  lng: number;
}

// Mendefinisikan tipe props untuk komponen
interface mbMapProps {
  location: LocationData | null;
  setLocation: (loc: LocationData) => void;
}

// Fix untuk icon leaflet yang hilang di Next.js (mengabaikan error khusus baris ini)
// @ts-expect-error - Mengabaikan properti internal leaflet yang tidak terdefinisi di Tipe bawaan
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Komponen untuk menangani klik pada peta
function MapClickHandler({ setLocation }: { setLocation: (loc: LocationData) => void }) {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

// Komponen untuk memindahkan kamera peta saat lokasi dicari
function MapUpdater({ location }: { location: LocationData | null }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 16, { animate: true });
    }
  }, [location, map]);
  return null;
}

export default function MapComponent({ location, setLocation }: mbMapProps) {
  const center = location || { lat: -6.175392, lng: 106.827153 }; // Default: Jakarta

  return (
    <div className="h-64 w-full rounded-xl overflow-hidden z-0 relative">
      <MapContainer 
        center={center} 
        zoom={16} 
        maxZoom={22} 
        scrollWheelZoom={false} 
        className="h-full w-full"
      >
        {/* Layer Satelit Esri Gratis */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; Esri"
          maxZoom={22}
          maxNativeZoom={19}
        />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          maxZoom={22}
          maxNativeZoom={19}
        />
        
        {location && (
          <Marker position={[location.lat, location.lng]} draggable={true} 
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target;
                const position = marker.getLatLng();
                setLocation({ lat: position.lat, lng: position.lng });
              },
            }}>
            <Popup>Lokasi Survei</Popup>
          </Marker>
        )}
        <MapClickHandler setLocation={setLocation} />
        <MapUpdater location={location} />
      </MapContainer>
    </div>
  );
}