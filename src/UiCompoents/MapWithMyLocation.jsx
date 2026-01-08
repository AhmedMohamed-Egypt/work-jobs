import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ButtonDefault from "./Button";
import { useState } from "react";
const LOCATIONS = [
  {
    id: 1,
    name: "Europe (Paris)",
    position: [48.8566, 2.3522],
  },
  {
    id: 2,
    name: "Asia (Tokyo)",
    position: [35.6762, 139.6503],
  },
  {
    id: 3,
    name: "North America (New York)",
    position: [40.7128, -74.006],
  },
  {
    id: 4,
    name: "South America (São Paulo)",
    position: [-23.5505, -46.6333],
  },
  {
    id: 5,
    name: "Africa (Cairo)",
    position: [30.0444, 31.2357],
  },
];
export default function MapWithMyLocation({handelClickLoc,handleMarker}) {

  return (
    <MapContainer 
      center={[20, 0]} // world center
      zoom={2.1}
      style={{ height: "400px", width: "100%" }}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <>
        {LOCATIONS.map((loc,index) => (
       <div key={index}>
          <Marker
            
            position={loc.position}
            eventHandlers={{
              click: () =>{handleMarker()},
            }}
          >
            <Popup>
             <div > {loc.name}</div>

              <ButtonDefault  onClick={()=>handelClickLoc(loc.name)} text={'Select'} classes={{root:'!mt-2 !text-xsss !py-[5px] !px-2 !font-medium !h-auto'}}></ButtonDefault>
            </Popup>
          </Marker>
          
       
       </div>
        ))}
      </>
    </MapContainer>
  );
}
