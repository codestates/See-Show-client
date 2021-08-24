import React from "react";
import { Link, withRouter} from "react-router-dom";
import axios from "axios";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      email: "",
      password: "",
      username: "",
      passwordCheck : "",
      errorMessage: ""
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleSignup = () => {
    const { nickname, email, password, username, passwordCheck } = this.state;
    if (!nickname || !email || !password || !username || !passwordCheck) {
      this.setState({ errorMessage: "모든 항목은 필수입니다" });
    }else if(password !== passwordCheck){
      this.setState({ errorMessage: "비밀번호가 일치하지 않습니다" });
    }
    else{
      const { nickname, password, username, email } = this.state;
      console.log(this.state)
      axios
      .post(`https://localhost:4000/signUp`, {nickname, password, username, email},  {withCredentials: true })
      .then((res) => {this.props.history.push("/login")})
      .catch(err=>console.log(err))
    }
  };
  // onClick={()=> window.location.href = "/login"}

  render() {
    return (
      <div className='login-body'>
          <div className='login-container'>
            <div className='login-window'>
              <div className='login-goback' ><Link to='/login'><img id="btn-goback" src="../resource/back_light_arrow_icon_131562.png" alt=""></img></Link></div>
              <div className='login-content'>
                <div className='login-welcome'>Sign Up</div>
                <div className='login-input-fields'>
                  <form onSubmit={(e)=> e.preventDefault()}>
                    <input className='login-input-line full-width' type='nickname' placeholder='ID' onChange={this.handleInputValue('nickname')}></input>
                    <input className='login-input-line full-width' type='email' placeholder='MAIL' onChange={this.handleInputValue('email')}></input>
                    <input className='login-input-line full-width' type='username' placeholder='NICKNAME' onChange={this.handleInputValue('username')}></input>
                    <input className='login-input-line full-width' type='password' placeholder='PASSWORD' onChange={this.handleInputValue('password')}></input>
                    <input className='login-input-line full-width' type='password' placeholder='CONFIRM PASSWORD' onChange={this.handleInputValue('passwordCheck')}></input>
                    
                    <div className='login-alert-box'>{this.state.errorMessage}</div>
                  </form>
                </div>
                <div className='login-spacing'>or sign up with <span className='signup-highlight'>Github</span></div>
                <div><button className='login-choicebtn-login' type='submit' onClick={this.handleSignup}>SUBMIT</button></div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(Signup);
