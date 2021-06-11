import React, { useState } from "react";

//img url 생성과 state에 set해주는 기능 필요.

function AddShowInput({ handleInputValue, startdateFormChange }) {
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일

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
    <div className="input-fields">
      <input
        className="input-line full-width addshow_title"
        type="title"
        placeholder="title"
        onChange={handleInputValue("title")}  //공연제목
      ></input>
      
      <div className="App"> 
        {imgBase64 ? (// 공연 썸네일 첨부
          <div>
            <img
              src={imgBase64}
              alt={imgFile.name}
              style={{
                backgroundColor: "#efefef",
                width: "150px",
                height: "150px",
              }}
            ></img> 
          </div> 
        ) : null}
        <div>
          <input
            type="file"
            name="imgFile"
            id="imgFile"
            onChange={handleChangeFile}
          />
        </div> 
      </div> 
      <input //공연 시작일
        className="input-line full-width addshow_startDate"
        type="date"
        placeholder="title"
        onChange={startdateFormChange("startDate")}
      ></input> 
      <input // 공연 종료일
        className="input-line full-width addshow_endDate"
        type="date"
        placeholder="title"
        onChange={startdateFormChange("endDate")}
      ></input>

      <div className="address" > 
        <div className="col-md-4 offset-md-5"> 
          <input //공연 주소(도로명)
            type="text"
            className="form-control m-input m--margin-top-10"
            name="address"
            id="address"
            placeholder="도로명 주소"
            readOnly
          />
        </div>
        <div className="col-md-4 offset-md-5">
          <input //공연 주소(상세 주소)
            type="text"
            className="form-control m-input m--margin-top-10"
            name="detailAddress"
            placeholder="상세 주소"
            required
          />
        </div>
      </div>

      <select
        className="input-line full-width area"
        name="지역"
        onChange={handleInputValue("area")}
      >
        <option value="서울">서울</option>
        <option value="경기">경기</option>
        <option value="인천">인천</option>
        <option value="강원">강원</option>
        <option value="충청">충청</option>
        <option value="세종">세종</option>
        <option value="경상">경상</option>
        <option value="부산">부산</option>
        <option value="대구">대구</option>
        <option value="전라">전라</option>
        <option value="광주">광주</option>
      </select>
    </div>
  );
}

export default AddShowInput;
