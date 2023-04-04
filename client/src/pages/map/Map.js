import React, { useRef } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


//var maps = L.map('maps').setView([51.505, -0.09], 13);

const defaultCenter = [38.9072, -77.0369];
const defaultZoom = 8;
const disneyWorldLatLng = [28.3852, -81.5639];
const disneyLandLatLng = [33.8121, -117.9190];

const MapChart = () => {
    const mapRef = useRef();

    /**
     * handleOnSetView
     */
  
    function handleOnSetView() {
      const { current = {} } = mapRef;
      const { leafletElement: map } = current;
  
      map.setView(disneyWorldLatLng, 14);
    }
  
    /**
     * handleOnFlyTo
     */
  
    function handleOnFlyTo() {
      const { current = {} } = mapRef;
      const { leafletElement: map } = current;
  
      map.flyTo(disneyLandLatLng, 14, {
        duration: 2
      });
    }
  
    return (
      <div className="App">
        <Map ref={mapRef} center={defaultCenter} zoom={defaultZoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
        </Map>
        </div>
        );
     };
        
export default MapChart;


// import React from "react";
// import { geoCentroid } from "d3-geo";
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Marker,
//   Annotation
// } from "react-simple-maps";

// import allStates from "./data/allstates.json";

// const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// const offsets = {
//   VT: [50, -8],
//   NH: [34, 2],
//   MA: [30, -1],
//   RI: [28, 2],
//   CT: [35, 10],
//   NJ: [34, 1],
//   DE: [33, 0],
//   MD: [47, 10],
//   DC: [49, 21]
// };

// const MapChart = () => {
//   return (
//     <ComposableMap projection="geoAlbersUsa">
//       <Geographies geography={geoUrl}>
//         {({ geographies }) => (
//           <>
//             {geographies.map(geo => (
//               <Geography
//                 key={geo.rsmKey}
//                 stroke="#FFF"
//                 geography={geo}
//                 fill="#DDD"
//               />
//             ))}
//             {geographies.map(geo => {
//               const centroid = geoCentroid(geo);
//               const cur = allStates.find(s => s.val === geo.id);
//               return (
//                 <g key={geo.rsmKey + "-name"}>
//                   {cur &&
//                     centroid[0] > -160 &&
//                     centroid[0] < -67 &&
//                     (Object.keys(offsets).indexOf(cur.id) === -1 ? (
//                       <Marker coordinates={centroid}>
//                         <text y="2" fontSize={14} textAnchor="middle">
//                           {cur.id}
//                         </text>
//                       </Marker>
//                     ) : (
//                       <Annotation
//                         subject={centroid}
//                         dx={offsets[cur.id][0]}
//                         dy={offsets[cur.id][1]}
//                       >
//                         <text x={4} fontSize={14} alignmentBaseline="middle">
//                           {cur.id}
//                         </text>
//                       </Annotation>
//                     ))}
//                 </g>
//               );
//             })}
//           </>
//         )}
//       </Geographies>
//     </ComposableMap>
//   );
// };

// export default MapChart;
