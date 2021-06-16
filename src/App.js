import React from "react";
import { Switch, Route, Redirect, withRouter,  } from "react-router-dom";
import Nav from "./pages/Nav";
import Hello from "./pages/Hello";
// import Ad from "./pages/Ad-cancel"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Moreinfo from "./pages/Moreinfo";
import Mypage from "./pages/Mypage";
import ForgotPw from "./pages/ForgotPw";
import ShowPage from "./pages/ShowPage";
import ResetPw from "./pages/ResetPw";
import Terms from "./pages/Terms";
import Terms_local from "./pages/Terms-local"
import axios from "axios";
import "./App.css";
import AddShow from "./pages/AddShow";
import ClickedDataEntry from "./Components/ClickedDataEntry copy";
import MapMarker from './Components/MapMarker'
class App extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    isLogin: false,
    userinfo: null,
    accessToken: null,
    firstCheck: null,
    userType: null,
  };
  this.hanldeUserinfo = this.hanldeUserinfo.bind(this);
  this.handleLogout = this.handleLogout.bind(this);
  this.WithdrawAccount = this.WithdrawAccount.bind(this);
  this.handleResponseSuccess = this.handleResponseSuccess.bind(this);
  this.getToken = this.getToken.bind(this);
}

  hanldeUserinfo (){
    axios.get("https://localhost:/mypage").then((res) => {
      this.setState({userinfo : res.data.userinfo })
      this.props.history.push("/mypage");
    });
  }


  handleLogout() {
    axios.post("https://localhost:8080/signout").then((res) => {
      this.setState({ isLogin: false, userinfo: null });
      this.props.history.push("/show");
      console.log('hnadle logou')
    });
  }

  WithdrawAccount(){
    axios.post("https://localhost:8080/myPage", '', {
      headers: {
          authorization: `Bearer ${this.props.accessToken}`,
          "content-type": "application/json",
          Accept: "application/json"
      }
  })
  .then(() => this.props.history.push("/show"))
  .catch(err=>console.log(err))

  }
  
 
  handleResponseSuccess(res) {
    // 사용자 정보를 호출, login state 변경.
    const { accessToken, userType } = res.data;
    this.setState({ accessToken, userType, isLogin: true });
    if(res.data.firstCheck) {
      this.setState({firstCheck: res.data.firstCheck});
      //만약  firstCheck가 1이라면 바로 실행하는 함수 만들어서 
      //moreinfo페이지로 넘어가게 하기.
      if(this.state.firstCheck === 1){
        return <Redirect to="/moreinfo" />
      }
    };
    
    //moreinfo에서는 헤더에 토큰 넣어서 같이 보내고, 장르 로케이션값 바디에 실어 보내기
  }
  async getToken(authorizationCode){
    let resp = await axios.post('http://localhost:8080/oauth', { authorizationCode: authorizationCode });
    this.setState({
      isLogin: true,
      accessToken: resp.data.data.accessToken,
      firstCheck: 1,
      userType: 'github',
    })
  }
  componentDidMount() {
    const url = new URL(window.location.href)// https://localhost:3000/show?code=wqkfb1j3bfvo1evo
    const authorizationCode = url.searchParams.get('code')
    if (authorizationCode) {
      this.getToken(authorizationCode);
    }
  }

 
  
 

  render() {
    const { isLogin, userinfo } = this.state;
    let url = new URL (window.location.href)
    let path = url.pathname;

    return (
      <div className="root">
        <Nav isLogin={isLogin} userinfo={userinfo} hanldeUserinfo={this.hanldeUserinfo} />
      
        {
          path === '/mypage' || path === '/Hello' || path ==='/login' || path ==='/signup' || path ==='/moreinfo' || path ==='/forgotpw' || path ==='/resetpw' || path ==='/terms' || path ==='/terms-local' ?
          <div className="videoWrapper"> 
            <video id="backgroundVideo" muted autoplay="" loop="loop" src="./resource/backgroundvideo.mp4" />
          </div>
        : <div></div>
        }
      
        <div className="root-contents">
        <Switch>
        <Route path="/mapmark" render={() => ( <MapMarker></MapMarker> )}  />
        <Route path="/showdetail" render={() => ( <ClickedDataEntry></ClickedDataEntry> )}  />
          <Route path="/Hello" render={() => ( <Hello userinfo={this.state.userinfo} /> )}  />
          {/* <Route path="/ad" render={() => <Ad />} /> */}
          <Route path="/login" render={() => ( <Login handleResponseSuccess={this.handleResponseSuccess} /> )}  />
          <Route exact path="/show" render={() => <ShowPage accessToken={this.state.accessToken}/>} />
          <Route exact path="/addShow" render={() => <AddShow />} />
          <Route exact path="/forgotpw" render={() => <ForgotPw />} />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route exact path="/moreinfo" render={() => <Moreinfo />} />
          <Route exact path="/mypage" render={() => <Mypage userinfo ={userinfo}  WithdrawAccount={this.WithdrawAccount}handleLogout = {this.handleLogout}  />} />
          <Route exact path="/resetpw" render={() => <ResetPw /> } />
          <Route exact path="/terms-default" render={() => <Terms /> } />
          <Route exact path="/terms-local" render={() => <Terms_local />} />
          <Route path="/" render={() => {
              if (isLogin) {
                return <Redirect to="/mypage" />;
              }
              return <Redirect to="/Hello" />;
            }}
          />
          <Route exact path="/show" render={() => {
              if (isLogin) {
                return <Redirect to="/show" />;
              }
              return <Redirect to="/login" />;
            }} />
        </Switch>
        </div>
      </div>
    );
  }
}
export default withRouter(App);
