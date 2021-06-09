import React, { Component } from "react";
import { GoogleLogin, GoogleLogout} from "react-google-login";
import { useHistory } from "react-router-dom";



const clientId =
  "143836767350-96ieh2blthq9qc0nakah5jbdv4b587ee.apps.googleusercontent.com";



class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      provider: "",
      isLogined : false,
      accessToken: ''
    };
  
    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login (response) {
    if (response.accessToken){
      this.setState(state => ({
        isLogined: true,
        accessToken: response.accessToken
      }))
   

    }
    console.log(response.Ft)
  }
   

  logout (response) {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
  }

  handleLoginFailure (response) {
    alert('Failed to log in')
  }

  handleLogoutFailure (response) {
    alert('Failed to log out')
  }




  render() {
    return (
     <div>
        <lable>
          <span>이메일</span>
          <input type="email" name="email" placeholder="이메일" />
        </lable>
        <lable>
          <span>비밀번호</span>
          <input type="password" name="password" placeholder="비밀번호" />
        </lable>
        <button>로그인</button>
         { this.state.isLogined ?
        <GoogleLogout
          clientId={ clientId}
          buttonText='Logout'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >
        </GoogleLogout>: <GoogleLogin
          clientId={ clientId}
          buttonText='Login'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }

          </div>
    );
    }
    }
    

export default Login;
