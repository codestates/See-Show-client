/*global kakao */
import React, { useEffect } from "react";
import './MapMarker.css'

export default function MapMarker({data}) {
   

   

  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    
    
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(data.gpsY, data.gpsX),
      level: 5,
    };
    //map
    const map = new kakao.maps.Map(container, options);

    //마커가 표시 될 위치
    let markerPosition = new kakao.maps.LatLng(
        data.gpsY, data.gpsX
    );

    // 마커를 생성
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);
  };

  // style={{ width: "55vw", height: "30vh" }}

  return <div id="map" ></div>;
}