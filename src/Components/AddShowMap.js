/*global kakao */


import React, { useEffect } from "react";
import "./AddShowInput.css"


export default function MapMarker({addressInput, setAddress, handleInputValue}) {
  useEffect(() => {
    mapscript();
  }, [addressInput.fullAddress]);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(addressInput.gpsY, addressInput.gpsX),
      level: 5,
    };
    //map
    const map = new kakao.maps.Map(container, options);

    //마커가 표시 될 위치
    let markerPosition = new kakao.maps.LatLng(
      addressInput.gpsY, addressInput.gpsX
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
      console.log(gpsYvalue,gpsXvalue)
      setAddress({...addressInput, gpsY : gpsYvalue, gpsX : gpsXvalue})
      map.relayout()
  })
  };


  return <div id="map" style={{ width: "65vw", height: "30vh"}}></div>;
}