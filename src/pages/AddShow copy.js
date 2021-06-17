/*global kakao*/
import React from "react";
import AddShowInput from "../Components/AddShowInput";
import axios from "axios";
import "./css/AddShow.css";
import Map from "../Components/AddShowMap";

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

  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleSubmit = () => {
    const { title, startDate, endDate, realmName, place, area, thumbnail, gpsX, gpsY} = this.state
      if( !title || !startDate || !endDate || !realmName || !place || !area || !thumbnail || !gpsX || !gpsY){
        this.setState({ errorMessage: "모든 항목은 필수입니다" });
      } else{
        axios.post(process.env.domain+"/addshow", {title, startDate, endDate, realmName, place, area, thumbnail, gpsX, gpsY},
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
           <Map handleInputValue={this.handleInputValue}></Map>
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
