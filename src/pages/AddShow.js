/*global kakao*/
import React from "react";
import AddShowInput from "../Components/AddShowInput";
import axios from "axios";
import "./css/AddShow.css";

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
    this.handleGpsX = this.handleGpsX.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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

  handleGpsX = (key,data)=>{
  this.setState({[key] : data})
  }

  handleSubmit = () => {
    const { title, startDate, endDate, realmName, place, area, thumbnail, gpsX, gpsY} = this.state
      if( !title || !startDate || !endDate || !realmName || !place || !area || !thumbnail || !gpsX || !gpsY){
        this.setState({ errorMessage: "모든 항목은 필수입니다" });
      } else{
        axios.post("https://localhost:8080/addshow", {title, startDate, endDate, realmName, place, area, thumbnail, gpsX, gpsY},
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
      <div className="addshow-container">

        <div className="addshow-input-fields">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="addshow-contents-Wrapper">
                 <AddShowInput handleGpsX={this.handleGpsX} handleInputValue={this.handleInputValue} startdateFormChange={this.startdateFormChange}></AddShowInput>
            </div>
          </form>
          <div className="addshow-alert-box">{this.state.errorMessage}</div>
        </div>
        <div className="addshow-submit-btn-area">
          
          <button className="addshow-submit-btn" onClick={this.handleSubmit}>SUBMIT</button>
          </div>

      </div>
    );
  }
}

export default AddShow;
