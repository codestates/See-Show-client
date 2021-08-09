import React from "react";
import { Link, withRouter} from "react-router-dom";
import axios from "axios";
import './css/Signup.css'

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
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
    const { userId, email, password, username, passwordCheck } = this.state;
    if (!userId || !email || !password || !username || !passwordCheck) {
      this.setState({ errorMessage: "모든 항목은 필수입니다" });
    }else if(password !== passwordCheck){
      this.setState({ errorMessage: "비밀번호가 일치하지 않습니다" });
    }
    else{
      const { userId, password, username, email } = this.state;
      axios
      .post(process.env.domain+"/signUp", {userId, password, username, email})
      .then((res) => {this.props.history.push("/login")})
      .catch(err=>console.log(err))
    }
  };
  // onClick={()=> window.location.href = "/login"}

  render() {
    return (
      <div className='signup-body'>
          <div className='signup-container'>
            <div className='signup-window'>
              <div className='signup-overlay'></div>
              <div className='signup-goback' ><Link to='/login'><img id="btn-goback" src="../resource/back_light_arrow_icon_131562.png"></img></Link></div>
              <div className='signup-content'>
                <div className='signup-welcome'>Sign Up</div>
                <div className='signup-input-fields'>
                  <form onSubmit={(e)=> e.preventDefault()}>
                    <input className='signup-input-line full-width' type='userId' placeholder='ID' onChange={this.handleInputValue('userId')}></input>
                    <input className='signup-input-line full-width' type='email' placeholder='MAIL' onChange={this.handleInputValue('email')}></input>
                    <input className='signup-input-line full-width' type='username' placeholder='NICKNAME' onChange={this.handleInputValue('username')}></input>
                    <input className='signup-input-line full-width' type='password' placeholder='PASSWORD' onChange={this.handleInputValue('password')}></input>
                    <input className='signup-input-line full-width' type='password' placeholder='CONFIRM PASSWORD' onChange={this.handleInputValue('passwordCheck')}></input>
                    
                    <div className='signup-alert-box'>{this.state.errorMessage}</div>
                  </form>
                </div>
                <div className='signup-spacing-signup'>or sign up with <span className='signup-highlight'>Github</span></div>
                <div><button className='signup-choicebtn-login' type='submit' onClick={this.handleSignup}>SUBMIT</button></div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(Signup);


{/* <form onSubmit={(e) => e.preventDefault()}>
{
     <div className="alert-box">{this.state.errorMessage}</div>
  }
  <div>
    <span>email</span>
    <input type="email" onChange={this.handleInputValue("email")}></input>
  </div>
  <div>
    <span>password</span>
    <input type="password" onChange={this.handleInputValue("password")}></input>
  </div>
  <div>
    <span>password check</span>
    <input type="password" onChange={this.handleInputValue("passwordCheck")}></input>
  </div>
  <div>
    <span>mobile</span>
    <input type="tel" onChange={this.handleInputValue("mobile")}></input>
  </div>
  
  <button className="btn btn-signup" type="submit" onClick={this.handleSignup}>
    Submit
  </button>

  <div>
    <span>social login</span>
  </div>
  
</form> */}