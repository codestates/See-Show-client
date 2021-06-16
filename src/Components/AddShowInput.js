import React, { useState } from "react";
import axios from "axios"
import './AddShowInput.css'
import Map from "../Components/AddShowMap";
import Test from "./test";


//img url 생성과 state에 set해주는 기능 필요.

function AddShowInput({ handleInputValue, startdateFormChange, handleGpsX, place, setPlace }) {
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [imageUrl, setImageUrl] = useState(imgBase64);
  const setFile = (e) => {
    if (e.target.files[0]) {
      const img = new FormData();
      img.append("file", e.target.files[0]);
      axios
        .post("http://localhost:8080/upload", img)
        .then((res) => {
          setImageUrl(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleChangeFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장
      console.log(event.target.files[0]);

      setImgFile(event.target.files[0]); // 파일 상태 업데이트
    }
  };
  return (
    <div className="add-body">
      <div className="add-bigtitle">공연 등록</div>

      <div className='add-contents'>
      <div className='add-left'>

          <div className="add-thumbnail-Wrapper"> 
            <div className='add-title'>공연 사진</div>
              {imgBase64 ? (// 공연 썸네일 첨부
            <div className='add-thumbnail-preview'>
              <img className="add-thumbnail" src={imgBase64} alt={imgFile.name} onChange={(e)=> setFile(e)}></img> 
            </div> 
            ) : null}
            <div className="add-thumbnail-uploadWrapper">
              <div className="add-subtitle">사진 크기는 가로 300px, 세로 400px로 조정됩니다</div>
              <input className="add-thumbnail-upload" type="file" name="imgFile" id="imgFile" onChange={handleChangeFile}/>
            </div> 
          </div> 
      </div>


      <div className='add-right'>
      <div className='add-formWrapper'>
          <div className='add-title'>공연제목</div>
          <input className="add-showtitle" type="title" placeholder="title" onChange={handleInputValue("title")} ></input>
      </div>

      
      <div className='add-formWrapper'>
        <div className='add-title'>시작일자</div>
      <input //공연 시작일
        className="add-show-startDate"
        type="date"
        placeholder="title"
        onChange={startdateFormChange("startDate")}
      ></input> 
      </div>

      <div className='add-formWrapper'>
        <div className='add-title'>종료일자</div>
      <input // 공연 종료일
        className="add-show-endDate"
        type="date"
        placeholder="title"
        onChange={startdateFormChange("endDate")}
      ></input>
      </div>

      <div className='add-formWrapper'>
        <div className='add-title'>공연주소</div>

        <div className='add-formWrapper'>
        <div className="add-adress-field2">
          <input //공연 주소(상세 주소)
            type="text"
            className="adr2"
            name="detailAddress"
            placeholder="주소를 검색해주세요."
            required
            value={place}
            // onChange={startdateFormChange("place")}
            // readOnly
          />
        </div>
      </div>
      </div>
      <Test setPlace={setPlace}></Test>
      <div className='add-formWrapper'>
        <div className='add-title'>노출지역</div>
      <select
        className="add-show-location"
        name="지역"
        onChange={handleInputValue("area")}
      >
        <option value="" disabled selected >공연 정보가 노출될 지역을 선택하세요</option>
        <option value='서울'>서울특별시</option>
        <option value='경기'>경기도</option>
        <option value='강원'>강원도</option>
        <option value='대전'>대전광역시</option>
        <option value='세종'>세종특별자치시</option>
        <option value='충북'>충청북도</option>
        <option value='충남'>충청남도</option>
        <option value='광주'>광주광역시</option>
        <option value='전북'>전라북도</option>
        <option value='전남'>전라남도</option>
        <option value='대구'>대구광역시</option>
        <option value='경북'>경상북도</option>
        <option value='경남'>경상남도</option>
        <option value='울산'>울산광역시</option>
        <option value='부산'>부산광역시</option>
        <option value='제주'>제주특별자치도</option>
      </select>
      </div>
      
      <div className='add-formWrapper'>
        <div className='add-title'>공연장르</div>
      <select
        className="add-show-genre"
        name="장르"
        onChange={handleInputValue("realmName")}
      >
        <option value="" disabled selected>공연 정보가 노출될 장르(카테고리)를 선택하세요</option>
        <option value="뮤지컬">뮤지컬</option>
        <option value="버스킹">버스킹</option>
      
      </select>
      </div>
      <Map handleGpsX={handleGpsX} place={place}></Map>

      </div>
    </div>
    </div>
  );
}

export default AddShowInput;
