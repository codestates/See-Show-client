import React, { useState } from "react";
import axios from "axios";
import "./AddShowInput.css";
import Map from "../Components/AddShowMap";
import PopupDom from "../Components/PopupDom";
import PopupPostCode from "../Components/PopupPostCode";
import { confirmAlert } from "react-confirm-alert"; // Import
import {Redirect, Link}from 'react-router-dom'


function AddShowInput({handleInputValue, startdateFormChange, handleGpsX, state}) {
  const {title,startDate,endDate,realmName,area,addressETC} = state
  const [addressInput, setAddress] = useState({fullAddress : null, gpsX : 127.11250810392936, gpsY : 37.38362433123213});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const openPostCode = () => {setIsPopupOpen(true);};
  const closePostCode = () => {setIsPopupOpen(false);};


  const handleChangeFile = (event) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); 
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
      console.log(event.target.files[0])
    }
  };


  const handleSubmit = () => {
    if (
      !title ||!startDate ||!endDate ||!realmName ||!addressETC ||!area 
    ) {
      alert( "모든 항목은 필수입니다" );
    } else {
      const newForm = new FormData();
      newForm.append("thumbnail",imgFile);
      newForm.append("title",title);
      newForm.append("startDate",startDate);
      newForm.append("endDate",endDate);
      newForm.append("realmName",realmName);
      newForm.append("area",area);
      newForm.append("gpsX",addressInput.gpsX);
      newForm.append("gpsY",addressInput.gpsY);
      newForm.append("place",addressInput.fullAddress+addressETC);
      for (var form of newForm.entries()) { console.log(form[0]+ ', ' + form[1]); }

      axios
        .post(process.env.REACT_APP_DOMAIN+"/show/posting", newForm,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((res) => {
          document.location.href = "/show"
        }); 
    }
  };

  const addShowConfirm = () => {
    confirmAlert({
      title: "공연을 등록하시겠습니까?",
      buttons: [
        {
          label: "예",
          onClick: () => {
            handleSubmit();
          },
        },
        {
          label: "아니오",
          onClick: () => {},
        },
      ],
    });
  };


  return (
    <div className="add-body">
      <div className="add-bigtitle">공연 등록</div>

      <div className="add-contents">
        <div className="add-left">
          <div className="add-thumbnail-Wrapper">
            <div className="add-title">공연 사진</div>
            {imgBase64 ? ( // 공연 썸네일 첨부
              <div className="add-thumbnail-preview">
                <img
                  className="add-thumbnail"
                  src={imgBase64}
                  alt={imgFile.name}
                ></img>
              </div>
            ) : (
              <div className="add-thumbnail-holder">사진을 업로드해주세요</div>
            )}
            <div className="add-thumbnail-uploadWrapper">
              <div className="add-subtitle">
                사진 크기는 가로 300px, 세로 400px로 조정됩니다
              </div>
              <input
                className="add-thumbnail-upload"
                type="file"
                name="imgFile"
                id="imgFile"
                onChange={handleChangeFile}
              />
            </div>
          </div>
        </div>
  



   
      
 
        <div className="add-right">
          <div className="add-formWrapper">
            <div className="add-title2">공연제목</div>
            <input
              className="adfinput"
              type="title"
              placeholder="공연제목"
              onChange={handleInputValue("title")}
            ></input>
          </div>

          <div className="add-formWrapper">
            <div className="add-title2">시작일자</div>
            <input
              className="adfinput"
              type="date"
              onChange={startdateFormChange("startDate")}
            ></input>
          </div>

          <div className="add-formWrapper">
            <div className="add-title2">종료일자</div>
            <input
              className="adfinput"
              type="date"
              onChange={startdateFormChange("endDate")}
            ></input>
          </div>

          <div className="add-formWrapper">
            <div className="add-title2">공연주소</div>
            <div className="add-adress-field2">
              <input type="text" className="adfinput" name="detailAddress" readOnly value ={addressInput.fullAddress || ""} />
              <input type="text" className="adfinput adfspacer" name="detailAddress" placeholder="주소를 검색해주세요." onChange={handleInputValue("addressETC")} />
            </div>
            <button className="locationbtn" type="button" onClick={openPostCode}>우편번호 검색</button>
          
          </div>

          <div id="popupDom">
            {isPopupOpen && (
              <PopupDom>
                <PopupPostCode
                  onClose={closePostCode}
                  setAddress={setAddress}
                />
              </PopupDom>
            )}
          </div>

          <div className="add-formWrapper">
            <div className="add-title2">노출지역</div>
            <select
              className="adfinput"
              name="지역"
              onChange={handleInputValue("area")}
            >
              <option value="default" disabled selected>
                공연 정보가 노출될 지역을 선택하세요
              </option>
              <option value="서울">서울특별시</option>
              <option value="경기">경기도</option>
              <option value="강원">강원도</option>
              <option value="대전">대전광역시</option>
              <option value="세종">세종특별자치시</option>
              <option value="충북">충청북도</option>
              <option value="충남">충청남도</option>
              <option value="광주">광주광역시</option>
              <option value="전북">전라북도</option>
              <option value="전남">전라남도</option>
              <option value="대구">대구광역시</option>
              <option value="경북">경상북도</option>
              <option value="경남">경상남도</option>
              <option value="울산">울산광역시</option>
              <option value="부산">부산광역시</option>
              <option value="제주">제주특별자치도</option>
            </select>
          </div>

          <div className="add-formWrapper">
            <div className="add-title2">공연장르</div>
            <select
              className="adfinput"
              name="장르"
              onChange={handleInputValue("realmName")}
            >
              <option value="" disabled selected>
                공연 정보가 노출될 장르(카테고리)를 선택하세요
              </option>
              <option value="뮤지컬">뮤지컬</option>
              <option value="버스킹">버스킹</option>
            </select>
          </div>
          <div className="addshow-alert">
            * 공연의 상세 위치를 클릭해 주세요
          </div>
          <Map  handleInputValue={handleInputValue} setAddress={setAddress} addressInput={addressInput}></Map>
        </div>
        {!title || !startDate || !endDate || !realmName ||  !area  ? 
        (
          <div className="addshow-submit-btn-areas">
            <div className="addshow-alert-box">{state.errorMessage}</div>
            <button className="addshow-submit-btn" onClick={handleSubmit}> SUBMIT </button>
          </div>
        ) : (
          <div className="addshow-submit-btn-areas">
            <div className="addshow-alert-box">{state.errorMessage}</div>
            <button className="addshow-submit-btn" onClick={addShowConfirm}> SUBMIT </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddShowInput;
