/*global kakao*/
import React from "react";
import AddShowInput from "../Components/AddShowInput";
import "./css/AddShow.css";
import { withRouter } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class AddShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      startDate: "",
      endDate: "",
      addressETC: "",
      realmName: "",
      area: "",
      thumbnail:
        "",
      errorMessage: "",
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


  render() {

    return (
      <div className="addshow-container">
        <div className="addshow-input-fields">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="addshow-contents-Wrapper">
              <AddShowInput state={this.state}  handleInputValue={this.handleInputValue} startdateFormChange={this.startdateFormChange}></AddShowInput>
            </div>
          </form>
        </div>
        
      </div>
    );
  }
}

export default withRouter(AddShow);
