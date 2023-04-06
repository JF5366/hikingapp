import React, { useRef } from 'react';
//import { Map, TileLayer } from 'react-leaflet';

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
// import { Icon } from "leaflet";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllTrails } from "../../services/trailService"


const MapChart = () => {
  const [trails, setTrails] = useState([])
  
  useEffect(() => {
    async function loadData() {
        const data = await getAllTrails()
        setTrails(data)
    }
    loadData()
}, [])
  
  

  
  const  start = [39.0119, -98.4842];

    return (
        
        <MapContainer  center={start} zoom={4.5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <div className="markers">
          {trails?.map((trail, index) => 
            <Marker position={trail.location}>
                  <Popup>
                  Start of the <Link to={`/trails/${trail._id}`} key={index}> {trail.name}</Link>

                  </Popup>
             </Marker>
          )}
        </div>
        
      </MapContainer>
    

    )
}
export default MapChart


//.....................................................

// const MapChart = () => {
//     state = {
//         center: [51.505, -0.091],
//         zoom: 13,
//       };
//         return (
//           <div>
//             <Map center={this.state.center} zoom={this.state.zoom}>
//               <TileLayer
//                 attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
//               />
//               <Marker position={this.state.center}>
//                 <Popup>
//                   A pretty CSS3 popup. <br /> Easily customizable.
//                 </Popup>
//               </Marker>
//             </Map>
//           </div>
//         );
//       }
        
// export default MapChart;
//.................................................
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
