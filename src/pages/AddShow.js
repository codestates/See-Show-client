/*global kakao*/

import React from "react";
// import DaumPostcode from "react-daum-postcode";
import AddShowInput from "../Components/AddShowInput";
import "./AddShow.css";
// import {Helmet} from "react-helmet";
// import KakaoMap from '../Components/AddShowMapContainer'
import axios from "axios";

class AddShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seq: "",
      title: "",
      startDate: "",
      endDate: "",
      place: "",
      realmName: "",
      area: "",
      thumbnail: "",
      gpsX: "",
      gpsY: "",
      postCode: false,
      isAddress: "",
      isZoneCode: "",
      errorMessage : ""
    }; 
    this.handleInputValue = this.handleInputValue.bind(this);
    this.startdateFormChange = this.startdateFormChange.bind(this);
  }

  startdateFormChange = (key) => (e) => {
    const newdate = e.target.value.replace(/-/gi, "");
    this.setState({ [key]: newdate });
    console.log(e.target.value);
    console.log(this.state)

  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
    console.log(e.target.value);
    console.log(this.state)
  };

  handleSubmit = () => {
    const { title, startDate, endDate, realmName, place, area, thumbnail, gpsX, gpsY} = this.state
      if( !title || !startDate || !endDate || !realmName || !place || !area || !thumbnail || !gpsX || !gpsY){
        this.setState({ errorMessage: "모든 항목은 필수입니다" });
      } else{
        axios.post("https://localhost:4000/addshow", {title, startDate, endDate, realmName, place, area, thumbnail, gpsX, gpsY},
        {headers : { 
          authorization: `Bearer ${this.props.accessToken}`,
          "Content-type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true
    })
    .then(()=> this.props.history.push("/show"))//등록한 공연의 상세페이지로 연결해야함.
    .catch(err => console.log(err))
      }
   
  }
  render() {

    return (
      <div className="container">
        <div className="input-fields">
          <form onSubmit={(e) => e.preventDefault()}>
            <AddShowInput
              handleInputValue={this.handleInputValue}
              startdateFormChange={this.startdateFormChange}
            ></AddShowInput>
        
            {/* <div id="map" > <KakaoMap></KakaoMap></div> */}
            {/* <Helmet>
              <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f7d0160ce4f9a416c4cc1077c1e52671" type="text/javascript" />
            </Helmet> */}
           
            <div className="alert-box">{this.state.errorMessage}</div>
	
          
          </form>
          <div>
          <button onClick={this.handleSubmit
            }>submit</button>

          </div>
        

        </div>
      </div>
    );
  }
}

export default AddShow;
