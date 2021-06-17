/*global kakao*/
import React from "react";
import AddShowInput from "../Components/AddShowInput";
import axios from "axios";
import "./css/AddShow.css";
import { withRouter } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class AddShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      startDate: "",
      endDate: "",
      place: "",
      realmName: "",
      area: "",
      thumbnail:
        "http://www.culture.go.kr/upload/rdf/21/06/rdf_202106081662354418.jpg",
      gpsX: "",
      gpsY: "",
      postCode: false,
      isAddress: "",
      isZoneCode: "",
      errorMessage: "",
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.startdateFormChange = this.startdateFormChange.bind(this);
    this.handleGpsX = this.handleGpsX.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addShowConfirm = this.addShowConfirm.bind(this);
    this.setPlace = this.setPlace.bind(this);
  }

  startdateFormChange = (key) => (e) => {
    const newdate = e.target.value.replace(/-/gi, "");
    this.setState({ [key]: newdate });
    console.log(e.target.value);
    console.log(this.state);
  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
    console.log(e.target.value);
    console.log(this.state);
  };
  setPlace(data) {
    this.setState({ place: data });
    console.log(this.state.place);
  }

  handleGpsX = (key, data) => {
    this.setState({ [key]: data });
  };

  handleSubmit = () => {
    const {
      title,
      startDate,
      endDate,
      realmName,
      place,
      area,
      thumbnail,
      gpsX,
      gpsY,
    } = this.state;
    if (
      !title ||
      !startDate ||
      !endDate ||
      !realmName ||
      !place ||
      !area ||
      !thumbnail ||
      !gpsX ||
      !gpsY
    ) {
      this.setState({ errorMessage: "모든 항목은 필수입니다" });
    } else {
      axios
        .post("https://localhost:8080/show/posting", {
          title,
          startDate,
          endDate,
          realmName,
          place,
          area,
          thumbnail,
          gpsX,
          gpsY,
        })
        .then((res) => {
          this.props.history.push("/show");
        }); 
    }
  };

  addShowConfirm = () => {
    confirmAlert({
      title: "공연을 등록하시겠습니까?",
      buttons: [
        {
          label: "예",
          onClick: () => {
            this.handleSubmit();
            alert("공연이 등록되었습니다.");
          },
        },
        {
          label: "아니오",
          onClick: () => {},
        },
      ],
    });
  };

  render() {
    const {
      title,
      startDate,
      endDate,
      realmName,
      place,
      area,
      thumbnail,
      gpsX,
      gpsY,
    } = this.state;
    // if( !title || !startDate || !endDate || !realmName || !place || !area || !thumbnail || !gpsX || !gpsY){
    return (
      <div className="addshow-container">
        <div className="addshow-input-fields">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="addshow-contents-Wrapper">

              <AddShowInput
                setPlace={this.setPlace}
                place={this.state.place}
                handleGpsX={this.handleGpsX}
                handleInputValue={this.handleInputValue}
                startdateFormChange={this.startdateFormChange}
              ></AddShowInput>
              {/* <Map handleGpsX={this.handleGpsX}></Map> */}
            </div>
          </form>
        </div>
        <div className="addshow-submit-btn-area">
        <div className="addshow-alert-box">{this.state.errorMessage}</div>

        {!title ||
        !startDate ||
        !endDate ||
        !realmName ||
        !place ||
        !area ||
        !thumbnail ||
        !gpsX ||
        !gpsY ? (
          <div className="addshow-submit-btn-area">
            <button
              className="addshow-submit-btn"
              onClick={this.handleSubmit}
            >
              SUBMIT
            </button>
          </div>
        ) : (
          <div className="addshow-submit-btn-area">
            <button
              className="addshow-submit-btn"
              onClick={this.addShowConfirm}
            >
              SUBMIT
            </button>
          </div>
        )}
      </div>
      </div>
    );
  }
}

export default withRouter(AddShow);
