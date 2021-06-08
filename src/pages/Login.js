import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorMessage: "",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  handleLogin = () => {
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ errorMessage: "이메일과 비밀번호를 입력하세요" });
    } else {
      axios
        .post(
          "https://localhost:4000/login",
          { email, password },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          this.props.handleResponseSuccess(res);
        })
        .catch((err) => console.log(err));
    }
  };
  render() {
    return (
      <div>
        <center>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <span>email</span>
              <input
                type="email"
                onChange={this.handleInputValue("email")}
              ></input>
            </div>
            <div>
              <span>password</span>
              <input
                type="password"
                onChange={this.handleInputValue("password")}
              ></input>
            </div>
            <button>
              <Link to="/signup">Sign Up</Link>
            </button>
            <button
              className="btn btn-login"
              type="submit"
              onClick={this.handleLogin}
            >
              로그인
            </button>
            <div>
              <Link to="/forgotpw">Forgot Password</Link>
            </div>

            <div>
              <span>social login</span>
            </div>
            
            {<div className="alert-box">{this.state.errorMessage}</div>}
          </form>
        </center>
      </div>
    );
  }
}

export default withRouter(Login);
