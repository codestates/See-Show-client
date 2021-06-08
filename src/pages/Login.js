import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import './Login.css'

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
      <div className='container'>
        <div className='window'>
         <div className='overlay'></div>
         <div className='content'>
            <div className='welcome'>Hello There!</div>
            <div className='input-fields'>
              <form onSubmit={(e)=> e.preventDefault()}>
               <input className='input-line full-width' type='email' placeholder='Email' onChange={this.handleInputValue("email")}></input>
               <input className='input-line full-width' type='password' placeholder='Password' onChange={this.handleInputValue("password")}></input>
               <div className='alert-box'>{this.state.errorMessage}</div>
              </form>
      </div>
      <div className='spacing'>or continue with <span className='highlight'>Facebook</span> / <span className='highlight'>Google</span></div>
      <div><button className='choicebtn-login' onClick={this.handleLogin}>LOGIN</button></div>
      <div><button className='choicebtn'>SIGN UP</button></div>
      <div><button className='choicebtn'>Forgot Password <Link to="/forgotpw"></Link></button></div>
    </div>
  </div>
</div>


    );
  }
}

export default withRouter(Login);


{/* <div className='login-box'>
<center>
  <form onSubmit={(e) => e.preventDefault()}>
    <div className='email'>
      <span className='logintitle'>email</span>
      <input className='form form-email' type="email" onChange={this.handleInputValue("email")}></input>
    </div>
    <div className='password'>
      <span className='logintitle'>password</span>
      <input className='form form-password' type="password" onChange={this.handleInputValue("password")} ></input>
    </div>
    <button className='btn btn-default'> SIGN UP
      <Link to="/signup"></Link>
    </button>
    <button className="btn btn-default" type="submit" onClick={this.handleLogin}>LOGIN</button>
    <button className='btn btn-default'> Forgot <br/> Password
      <Link to="/forgotpw"></Link>
    </button>

    <div className='social'>
      <span>social login</span>
    </div>
    
    {<div className="alert-box">{this.state.errorMessage}</div>}
  </form>
</center>
</div> */}