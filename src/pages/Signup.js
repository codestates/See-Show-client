import React from "react";
import { withRouter} from "react-router-dom";
import axios from "axios";
import './Signup.css'

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
          <div className='container'>
            <div className='window'>
              <div className='overlay'></div>
              <div className='content'>
                <div className='welcome'>Sign Up</div>
                <div className='input-fields'>
                  <form onSubmit={(e)=> e.preventDefault()}>
                    <input className='input-line full-width' type='userId' placeholder='ID' onChange={this.handleInputValue('userId')}></input>
                    <input className='input-line full-width' type='password' placeholder='PASSWORD' onChange={this.handleInputValue('password')}></input>
                    <input className='input-line full-width' type='password' placeholder='CONFIRM PASSWORD' onChange={this.handleInputValue('passwordCheck')}></input>
                    <input className='input-line full-width' type='mobile' placeholder='MOBILE PHONE' onChange={this.handleInputValue('mobile')}></input>
                    <div className='alert-box'>{this.state.errorMessage}</div>
                  </form>
                </div>
                <div className='spacing'>or sign up with <span className='highlight'>Github</span></div>
                <div><button className='choicebtn-login' type='submit' onClick={this.handleSignup}>SUBMIT</button></div>
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