import React from "react";
// import DaumPostcode from "react-daum-postcode";
import AddShowInput from "../Components/AddShowInput";
import "./css/AddShow.css";

class AddShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seq: "",
      title: { _text: "" },
      startDate: { _text: "" },
      endDate: { _text: "" },
      place: { _text: "" },
      realmName: { _text: "" },
      area: { _text: "" },
      thumbnail: { _text: "" },
      gpsX: { _text: "" },
      gpsY: { _text: "" },
      postCode: false,
      isAddress: "",
      isZoneCode: "",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.startdateFormChange = this.startdateFormChange.bind(this);
  }

  startdateFormChange = (key) => (e) => {
    const newdate = e.target.value.replace(/-/gi, "");
    this.setState({ [key]: { _text: newdate } });
    console.log(e.target.value);
  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: { _text: e.target.value } });
    console.log(e.target.value);
  };

  render() {
    return (
      <div className="container">
        <div className="input-fields">
          <form onSubmit={(e) => e.preventDefault()}>
            <AddShowInput
              handleInputValue={this.handleInputValue}
              startdateFormChange={this.startdateFormChange}
            ></AddShowInput>
            <button>submit</button>
          </form>
          <div className="alert-box">{this.state.errorMessage}</div>
        </div>
      </div>
    );
  }
}

export default AddShow;
