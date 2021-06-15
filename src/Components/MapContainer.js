import React from "react";
import { KakaoMap } from "react-kakao-maps";
// import dotenv 
 
export default function MapContainer() {
  return (
    <KakaoMap
      apiUrl="f7d0160ce4f9a416c4cc1077c1e52671"
      width="100%"
      height="700px"
      level={2}
      lat={37.490826}
      lng={127.03342}
    ></KakaoMap>
  );
}