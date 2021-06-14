import React from "react";
import axios from "axios";
import './css/ForgotPw.css'

axios.defaults.withCredentials = true;

class ForgotPw extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId:"",
            email:"",
            isRequest: "",
            errorMessage: "",
        }
        this.handleInputValue = this.handleInputValue.bind(this)
    }

    handleInputValue = (key) => (e)=> {
        this.setState({ [key]: e.target.value });
    };

    handleRequest = () => {
        const { userId, isRequest, email } = this.state;

        if(isRequest) {
            this.setState({errorMessage: "이미 메일을 발송하였습니다"})
        }

        if(!email || !userId) {
            this.setState({errorMessage: "계정 정보를 입력하세요"})
        } else {
            this.setState({isRequest: true, errorMessage: "비밀번호 재설정 메일을 발송하였습니다"});

            axios.post("https://localhost:4000/forgotpw", this.state, {
                headers: {
                    "Content-type" : "application/json",
                    Accept: "application/json",
                }
            })
            .then(()=> this.props.history.push("/"))
            .catch(err=>console.log(err))
        }

    }

    render() {
        return(
            <div className='forgot-body'>
            <div className='forgot-container'>
                <div className='forgot-window'>
                    <div className='forgot-overlay'></div>
                    <div className='forgot-goback'><img id="btn-goback" src="./resource/back_light_arrow_icon_131562.png"></img></div>
                    <div className='forgot-content'>
                        <div className='forgot-welcome'>Forgot Password</div>
                        <div className='forgot-input-fields'>
                            <form onSubmit={(e)=> e.preventDefault()}>
                                <input className='forgot-input-line full-width' type='userId' placeholder='ID' onChange={this.handleInputValue('userId')}></input>
                                <input className='forgot-input-line full-width' type='email' placeholder='MAIL' onChange={this.handleInputValue('email')}></input>
                                <div className='forgot-alert-box'>{this.state.errorMessage}</div>
                            </form>
                        </div>
                        <div className='forgot-spacing-A'>계정 정보를 입력하시면, 일치하는 가입 정보에 등록된 주소로 비밀번호 재설정 메일을 보내드립니다.</div>
                        <div className='forgot-spacing-B'>Once you enter your account, we will send you a password reset email with matching information.</div>
                        <div><button className='forgot-choicebtn-login' type='submit' onClick={this.handleRequest}>SUBMIT</button></div>
                    </div>
                </div>
            </div>
            </div>
        )
    }









}

export default ForgotPw;