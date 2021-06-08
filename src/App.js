import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import ForgotPw from "./pages/ForgotPw";
import ShowPage from "./pages/ShowPage";
import axios from "axios";

class App extends React.Component {
  state = {
    isLogin: false,
    userinfo: null,
  };
  handleLogout(){
    axios
      .post('https://localhost:4000/signout')
      .then(res => {
        this.setState({ isLogin: false, userinfo: null });
        this.props.history.push('/show');
      })
  }

  handleResponseSuccess(res) {
    // 사용자 정보를 호출, login state 변경.
    console.log("handleResponseSuccess");
    axios
    .get('https://localhost:4000/user')
    .then(res => {
      this.setState({ isLogin: true, userinfo: res.data });
      this.props.history.push('/myPage');
    })
    .catch(err => console.log(err))
  }

  render() {
    const { isLogin, userinfo } = this.state;

    return (
      <div>
        <Switch>
          <Route
            path="/login"
            render={() => (
              <Login
                handleResponseSuccess={this.handleResponseSuccess.bind(this)}
              />
            )}
          />
          <Route exact path="/show" render={() => <ShowPage />} />
          <Route exact path="/forgotpw" render={() => <ForgotPw />} />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route exact path="/mypage" render={() => <Mypage 
                userinfo ={this.state.userinfo}
                handleLogout = {this.handleLogout.bind(this)}
                />} />
          <Route
            path="/"
            render={() => {
              if (isLogin) {
                return <Redirect to="/mypage" />;
              }
              return <Redirect to="/login" />;
            }}
          />
          {/* <Route exact path="/show" render={() => {
              if (isLogin) {
                return <Redirect to="/show" />;
              }
              return <Redirect to="/login" />;
            }} /> */}
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
