import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import './css/ResetPw.css'

axios.defaults.withCredentials = true;


class ResetPw extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            userId:"",
            newpw:"",
            pwCheck:"",
            errorMessage:"",
        }

        this.handleInputValue = this.handleInputValue.bind(this);

    }


    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
      };

    handleSubmit = () => {
        const {userId, newpw, pwCheck} = this.state;
        if(!userId || !newpw || !pwCheck) {
            this.setState({ errorMessage: "모든 항목은 필수입니다"})
        } else if(newpw !== pwCheck) {
            this.setState({ errorMessage: "비밀번호가 일치하지 않습니다"});
        } else {
            axios.post("https://localhost:4000/resetpw", this.state, {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json"
                },
            })
            .then(()=> this.props.history.push("/"))
            .catch(err=>console.log(err))
        }
    }

    render() {
        return(
            <div className="reset-body">
            <div className='reset-container'>
                <div className='reset-window'>
                    <div className='reset-overlay'></div>
                    <div className='reset-content'>
                        <div className='reset-welcome'>Reset Password</div>
                        <div className='reset-input-fields'>
                            <form onSubmit={(e)=> e.preventDefault()}>
                            <input className='reset-input-line full-width' type='userId' placeholder='ID' onChange={this.handleInputValue('userId')}></input>
                            <input className='reset-input-line full-width' type='password' placeholder='PASSWORD' onChange={this.handleInputValue('newpw')}></input>
                            <input className='reset-input-line full-width' type='password' placeholder='CONFIRM PASSWORD' onChange={this.handleInputValue('pwCheck')}></input>
                            <div className='reset-alert-box'>{this.state.errorMessage}</div>
                            </form>
                        </div>
                        <div className='reset-spacing-res'></div>
                        <div><button className='reset-choicebtn-login' type='submit' onClick={this.handleSubmit}>SUBMIT</button></div>
                    </div>
                </div>
            </div>
            </div>
        )
    }



}


export default ResetPw