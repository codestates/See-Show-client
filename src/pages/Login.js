import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import './css/Login.css'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      password: "",
      errorMessage: "",
      githubURL: `https://github.com/login/oauth/authorize?client_id=a904f09f2c93d6013422`
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleGithubAssign = () => {
    window.location.assign(this.state.githubURL);
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  //1. login 버튼 누르면 실행
  handleLogin = () => {
    const { nickname, password } = this.state;
    console.log(nickname)
    if (!nickname || !password) {
      this.setState({ errorMessage: "아이디와 비밀번호를 입력하세요" });
    } else {
      axios.post(process.env.REACT_APP_DOMAIN+"/login",{ nickname, password },
    )
        .then((res) => {
          // console.log(`thisisREACT_APP_DOMAIN`, process.env.REACT_APP_DOMAIN)
          console.log(res.data,'성공')
          this.props.handleResponseSuccess(res.data);
          this.props.handleUserinfo()
          if(res.data.data.firstcheck ===1){
            this.props.history.push('/moreinfo')
          }else{
          this.props.history.push("/show") 
          }
          //handleResponse에서 리다이렉트
        })
    }
  };
  render() {
    return (
      <div className='login-body'>
      <div className='login-container'>
        <div className='login-window'>
         <div className='login-goback' onClick={()=> window.location.href = "/"}><img id="btn-goback" src="./resource/back_light_arrow_icon_131562.png" alt=""></img></div>
         <div className='login-content'>
            <div className='login-welcome'>Hello There!</div>
            <div className='login-input-fields'>
              <form onSubmit={(e)=> e.preventDefault()}>
               <input className='login-input-line full-width' type='nickname' placeholder='ID' onChange={this.handleInputValue("nickname")}></input>
               <input className='login-input-line full-width' type='password' placeholder='PASSWORD' onChange={this.handleInputValue("password")}></input>
               <div className='login-alert-box'>{this.state.errorMessage}</div>
              </form>
      </div>
      <div className='login-spacing'>or continue with <div onClick={this.handleGithubAssign} className='login-highlight' href="https://github.com/login/oauth/authorize?client_id=a904f09f2c93d6013422">Github</div></div>
      <div><button className='login-choicebtn-login' onClick={this.handleLogin}>LOGIN</button></div>
      <div><Link to='/signup'><button className='login-choicebtn'>SIGN UP</button></Link></div>
      <div><Link to="/forgotpw"><button className='login-choicebtn'>Forgot Password</button></Link></div>
    </div>
  </div>
</div>
</div>


    );
  }
}

export default withRouter(Login);

