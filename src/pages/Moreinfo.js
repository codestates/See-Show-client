import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import './css/Moreinfo.css'
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class Moreinfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            area: '서울',
            genre: '기타',
        }
        this.handleChangeGenre = this.handleChangeGenre.bind(this)
        this.handleChangeLocation = this.handleChangeLocation.bind(this)
    }

    handleChangeLocation(e){
        this.setState({
            area: e.target.value
        })
    }

    handleChangeGenre(e){
        this.setState({
            genre: e.target.value
        })
    }


    handleSubmit = () => {
        const { area, genre } = this.state;
        axios.post(process.env.REACT_APP_DOMAIN+"/firstcheck", {area:area, genre:genre}, {
            headers: {
                authorization: `Bearer ${this.props.accessToken}`,
            },withCredentials: true
        })
        .then(res => {
            this.props.setStateUserInfo(res.data.data.userinfo)
            console.log(res.data,'ddddd')
            // if(res.data.data.accessToken){
            //     return this.props.setStateAccessToken(res.data.data.accessToken)
            // }
        })
        .catch(err=>console.log(err))
    }

    render() {
        // const {userinfo} =this.props.userinfo
        // console.log(userinfo, '@@@@@@@@@')
    return (
        <div className='login-body'>
        <div className='login-container'>
            <div className='login-window'>
                <div className='login-content'>
                    <div className='login-welcome'>Personal Options</div>
                    <div className='moreinfo-infoTable'>
                    <form onSubmit={(e)=> e.preventDefault()}>
                        <div className='moreinfo-local'>관심지역 선택</div>
                            <select className='moreinfo-select-location' onChange={this.handleChangeLocation}>
                                <option value='서울'>서울특별시</option>
                                <option value='경기'>경기도</option>
                                <option value='강원'>강원도</option>
                                <option value='대전'>대전광역시</option>
                                <option value='세종'>세종특별자치시</option>
                                <option value='충북'>충청북도</option>
                                <option value='충남'>충청남도</option>
                                <option value='광주'>광주광역시</option>
                                <option value='전북'>전라북도</option>
                                <option value='전남'>전라남도</option>
                                <option value='대구'>대구광역시</option>
                                <option value='경북'>경상북도</option>
                                <option value='경남'>경상남도</option>
                                <option value='울산'>울산광역시</option>
                                <option value='부산'>부산광역시</option>
                                <option value='제주'>제주특별자치도</option>
                            </select>
                        <div className='moreinfo-genre'>관심장르 선택</div>
                            <select className='moreinfo-select-genre' onChange={this.handleChangeGenre}>
                            <option value='뮤지컬'>뮤지컬</option>
                            <option value='콘서트'>콘서트</option>
                            <option value='연극'>연극</option>
                            <option value='오페라'>오페라</option>
                            <option value='버스킹'>버스킹</option>
                            <option value='미술'>미술</option>
                            <option value='기타'>기타</option>
                            </select>
                    </form>
                    <div className='moreinfo-spacing-PO'>관심지역과 관심장르를 선택해 주세요.</div>
                    <div className='moreinfo-spacing-P1'>이 옵션은 나중에 마이페이지에서도 변경할 수 있습니다</div>
                    <div> <Link to='/mypage'> <button className='moreinfo-choicebtn-login' type='submit' onClick={this.handleSubmit}>SUBMIT</button></Link></div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
    }

}



export default withRouter(Moreinfo)