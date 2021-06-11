import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import './Moreinfo.css'

class Moreinfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: '',
            genre: '',
        }
        this.handleChangeGenre = this.handleChangeGenre.bind(this)
        this.handleChangeLocation = this.handleChangeLocation.bind(this)
    }

    handleChangeLocation(e){
        this.setState({
            location: e.target.value
        })
    }

    handleChangeGenre(e){
        this.setState({
            genre: e.target.value
        })
    }


    handleSubmit = () => {
        const { location, genre } = this.state;
        axios.post("https://localhost:4000/moreinfo", this.state, {
            headers: {
                "content-type": "application/json",
                Accept: "application/json"
            },
        })
        .then(() => this.props.history.push("/"))
        .catch(err=>console.log(err))

    }

    render() {
    return (
        <div className='container'>
            <div className='window-select'>
                <div className='overlay'></div>
                <div className='content'>
                    <div className='welcome'>Personal Options</div>
                    <div className='infoTable'>
                    <form onSubmit={(e)=> e.preventDefault()}>
                        <div className='local'>관심지역 선택</div>
                            <select className='select-location' onChange={this.handleChangeLocation}>
                                <option value='서울'>서울특별시</option>
                                <option value='경기'>경기도</option>
                                <option value='강원'>강원도</option>
                                <option value='대전'>대전광역시</option>
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
                        <div className='genre'>관심장르 선택</div>
                            <select className='select-genre' onChange={this.handleChangeGenre}>
                            <option value='뮤지컬'>뮤지컬</option>
                            <option value='콘서트'>콘서트</option>
                            <option value='연극'>연극</option>
                            <option value='오페라'>오페라</option>
                            <option value='버스킹'>버스킹</option>
                            <option value='미술'>미술</option>
                            <option value='기타'>기타</option>
                            </select>
                    </form>
                    <div className='spacing-PO'>관심지역과 관심장르를 선택해 주세요. 이 옵션은 나중에 마이페이지에서도 변경할 수 있습니다</div>
                    <div> <Link to="/showpage"> <button className='choicebtn-login' type='submit' onClick={this.handleSubmit}>SUBMIT</button> </Link> </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }

}



export default Moreinfo