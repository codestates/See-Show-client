import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import './Login.css'

axios.defaults.withCredentials = true;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      password: "",
      errorMessage: "",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  handleLogin = () => {
    const { userId, password } = this.state;
    if (!userId || !password) {
      this.setState({ errorMessage: "아이디와 비밀번호를 입력하세요" });
    } else {
      axios.post("https://localhost:4000/login",{ userId, password },
          {
            headers: {
              "Content-type": "application/json"
            },
            withCredentials: true
          }
        )
        .then((res) => {
          this.props.handleResponseSuccess(res.data);
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
               <input className='input-line full-width' type='userId' placeholder='ID' onChange={this.handleInputValue("userId")}></input>
               <input className='input-line full-width' type='password' placeholder='PASSWORD' onChange={this.handleInputValue("password")}></input>
               <div className='alert-box'>{this.state.errorMessage}</div>
              </form>
      </div>
      <div className='spacing'>or continue with <a className='highlight' href="https://github.com/login/oauth/authorize?client_id=a904f09f2c93d6013422">Github</a></div>
      <div><button className='choicebtn-login' onClick={this.handleLogin}>LOGIN</button></div>
      <div><Link to='signup/'><button className='choicebtn'>SIGN UP</button></Link></div>
      <div><Link to="/forgotpw"><button className='choicebtn'>Forgot Password</button></Link></div>
    </div>
  </div>
</div>


    );
  }
}

export default withRouter(Login);

