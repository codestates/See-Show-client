/*global kakao */
import React, { useEffect } from "react";

export default function MapMarker({handleGpsX}) {
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(35.1469155857794, 126.919994481568),
      level: 5,
    };
    //map
    const map = new kakao.maps.Map(container, options);

    //마커가 표시 될 위치
    let markerPosition = new kakao.maps.LatLng(
      35.1469155857794, 126.919994481568
    );

    // 마커를 생성
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
      // 클릭한 위도, 경도 정보를 가져옵니다 
      const latlng = mouseEvent.latLng; 
      
      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);
      
      const gpsYvalue = latlng.getLat()
      const gpsXvalue = latlng.getLng()
      

      handleGpsX("gpsY", gpsYvalue)
      handleGpsX("gpsX", gpsXvalue)
      
      
  })
  };

  return <div id="map" style={{ width: "30vw", height: "30vh" }}></div>;
}