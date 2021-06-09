import React from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      password: "",
      mobile: "",
      errorMessage: "",
      passwordCheck : "",
      genre : "",
      area : ""
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleSignup = () => {
    const { userId, password, mobile, passwordCheck } = this.state;
    if (!userId || !password || !mobile || !passwordCheck) {
      this.setState({ errorMessage: "모든 항목은 필수입니다" });
    }else if(password !== passwordCheck){
      this.setState({ errorMessage: "비밀번호가 일치하지 않습니다" });
    }
    else{
      axios
      .post("https://localhost:4000/signup", this.state, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then(() => this.props.history.push("/"))
      .catch(err=>console.log(err))
    }
  };

  render() {
    return (
      <div>
        <center>
          <form onSubmit={(e) => e.preventDefault()}>
          {
               <div className="alert-box">{this.state.errorMessage}</div>
            }
            <div>
              <span>userId</span>
              <input
                type="userId"
                onChange={this.handleInputValue("userId")}
              ></input>
            </div>
            <div>
              <span>password</span>
              <input
                type="password"
                onChange={this.handleInputValue("password")}
              ></input>
            </div>
            <div>
              <span>password check</span>
              <input
                type="password"
                onChange={this.handleInputValue("passwordCheck")}
              ></input>
            </div>
            <div>
              <span>mobile</span>
              <input
                type="tel"
                onChange={this.handleInputValue("mobile")}
              ></input>
            </div>
            
            <button
              className="btn btn-signup"
              type="submit"
              onClick={this.handleSignup}
            >
              Submit
            </button>

            <div>
              <span>social login</span>
            </div>
            
          </form>
        </center>
      </div>
    );
  }
}

export default withRouter(Signup);
