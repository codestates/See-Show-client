import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import './ForgotPw.css'

axios.defaults.withCredentials = true;

class ForgotPw extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
        const { email, isRequest } = this.state;

        if(isRequest) {
            this.setState({errorMessage: "비밀번호 재설정 메일을 발송하였습니다"})
        }

        if(!email) {
            this.setState({errorMessage: "계정 정보를 입력하세요"})
        } else {
            this.setState({isRequest: true});

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
            <div className='container'>
                <div className='window'>
                    <div className='overlay'></div>
                    <div className='content'>
                        <div className='welcome'>Forgot Password</div>
                        <div className='input-fields'>
                            <form onSubmit={(e)=> e.preventDefault()}>
                                <input className='input-line full-width' type='userId' placeholder='ID' onChange={this.handleInputValue('userId')}></input>
                                <div className='alert-box'>{this.state.errorMessage}</div>
                            </form>
                        </div>
                        <div className='spacing-A'>계정 정보를 입력하시면, 일치하는 가입 정보에 등록된 주소로 비밀번호 재설정 메일을 보내드립니다.</div>
                        <div className='spacing-B'>Once you enter your account, we will send you a password reset email with matching information.</div>
                        <div><button className='choicebtn-login' type='submit' onClick={this.handleRequest}>SUBMIT</button></div>
                    </div>
                </div>
            </div>
        )
    }









}

export default ForgotPw;