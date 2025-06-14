import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { MapPin } from 'lucide-react';
import L from 'leaflet';
import styled from 'styled-components'

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MyMap = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(true);
  const companyAddress = "Aagam Ochid, Nadani-2, Vesu, Surat"; // Example: Empire State Building
  const OPENCAGE_API_KEY = 'a3d9f1dbddf043128c8d379996785793'; // Replace with your API key

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(companyAddress)}(
            companyAddress
          )}&key=${OPENCAGE_API_KEY}`
        );

        const { lat, lng } = response.data.results[0].geometry;
        setLocation({ lat, lng });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        // Fallback coordinates (New York City)
        setLocation({ lat: 40.7128, lng: -74.0060 });
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Wrapper>
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-gradient-to-r bg-rose-50">
          <h2 className="heading text-2xl font-bold text-center text-[#dc2626]  flex items-center">
            
           <div className='m-2 our-location'>Our Location</div>
           <MapPin className="mr-2 pin" />
          </h2>
          <p className="address text-center mt-1">{companyAddress}</p>
        </div>
        <div className='upper-cont'>
        <div className="map-cont h-[500px] relative z-0">
          <MapContainer
            center={[ location.lat, location.lng]}
            zoom={12}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.lat, location.lng]}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold">Our Office</h3>
                  <p className="text-sm">{companyAddress}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        </div>
      </div>
    </div>
    </Wrapper>
  );
};
const Wrapper=styled.section`
.address{
font-size:large;
}
.our-location{
font-size:3vw;
}
.heading{
display:flex;
justify-content:center;
align-items:center;
font-weight:600;
}
.address{
}
.map-cont{
width:80%;
display:flex;
justify-content:center;
align-items: center;

}
.upper-cont{
z-index:0;
width:100%;
display:flex;
justify-content:center;
align-items: center;
padding:2%;
}
`;

export default MyMap;