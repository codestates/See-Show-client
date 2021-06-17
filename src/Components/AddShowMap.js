/*global kakao */

// import React, { useEffect } from 'react';

// const { kakao } = window;

// const MapContainer = ({place}) => {
//   useEffect(() => {
//         const container = document.getElementById('myMap');
// 		const options = {
// 			center: new kakao.maps.LatLng(33.450701, 126.570667),
// 			level: 3
// 		};
//         const map = new kakao.maps.Map(container, options);
    
//         var geocoder = new kakao.maps.services.Geocoder();

//         // 주소로 좌표를 검색합니다
//         geocoder.addressSearch(place, function(result, status) {
        
//             // 정상적으로 검색이 완료됐으면 
//              if (status === kakao.maps.services.Status.OK) {
        
//                 var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        
//                 // 결과값으로 받은 위치를 마커로 표시합니다
//                 var marker = new kakao.maps.Marker({
//                     map: map,
//                     position: coords
//                 });
        
//                 // 인포윈도우로 장소에 대한 설명을 표시합니다
//                 var infowindow = new kakao.maps.InfoWindow({
//                     content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
//                 });
//                 infowindow.open(map, marker);
        
//                 // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
//                 map.setCenter(coords);
//             } 
//         }); 
//       }, []);   
      
//     return (
//         <div id='myMap' style={{
//             width: '500px', 
//             height: '500px'
//         }}></div>
//     )
    
//       }

// export default MapContainer;
import React, { useEffect } from "react";
import "./AddShowInput.css"


export default function MapMarker({handleGpsX}) {
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.56694125357449, 126.9782221005918),
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

// <<<<<<< conflict_clear_1
  return <div id="map" style={{ width: "65vw", height: "30vh"}}></div>;
// =======
  return <div id="map" style={{ width: "50vw", height: "50vh" }}></div>;
// >>>>>>> dev
}