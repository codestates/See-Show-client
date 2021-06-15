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

class App extends React.Component {
  state = {
    isLogin: false,
    userinfo: null,
    accessToken: null,
    firstCheck: null,
    userType: null,
  };

  hanldeUserinfo (){
    axios.get("https://localhost:4000/mypage").then((res) => {
      this.setState({userinfo : res.data.userinfo })
      this.props.history.push("/mypage");
    });
  }


  handleLogout() {
    axios.post("https://localhost:4000/signout").then((res) => {
      this.setState({ isLogin: false, userinfo: null });
      this.props.history.push("/show");
    });
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

    return (
      <div className="root">
        <Nav userinfo={userinfo} hanldeUserinfo={this.hanldeUserinfo.bind(this)}/>
      
        {
          !isLogin ?
          <div className="videoWrapper"> 
            <video id="backgroundVideo" muted autoplay="" loop="loop" src="./resource/backgroundvideo.mp4" />
          </div>
        : <div></div>
        }
      
        <div className="root-contents">
        <Switch>
        <Route path="/showdetail" render={() => ( <ClickedDataEntry></ClickedDataEntry> )}  />

          <Route path="/Hello" render={() => ( <Hello userinfo={this.state.userinfo} /> )}  />
          {/* <Route path="/ad" render={() => <Ad />} /> */}
          <Route path="/login" render={() => ( <Login handleResponseSuccess={this.handleResponseSuccess.bind(this)} /> )}  />
          <Route exact path="/show" render={() => <ShowPage />} />
          <Route exact path="/addShow" render={() => <AddShow />} />
          <Route exact path="/forgotpw" render={() => <ForgotPw />} />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route exact path="/moreinfo" render={() => <Moreinfo />} />
          <Route exact path="/mypage" render={() => <Mypage userinfo ={userinfo} handleLogout = {this.handleLogout.bind(this)}  />} />
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
