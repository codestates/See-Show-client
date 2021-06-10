import React, { useMemo } from 'react';
import Select from 'react-select'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import './Moreinfo.css'

function Moreinfo() {
    const localoptions = useMemo(
        () => [
            {value: "서울", label: '서울'},
            {value: "경기", label: '경기'},
            {value: "강원", label: '강원'},
            {value: "충북", label: '충북'},
            {value: "대전", label: '대전'},
            {value: "충남", label: '충남'},
            {value: "전북", label: '전북'},
            {value: "광주", label: '광주'},
            {value: "전남", label: '전남'},
            {value: "대구", label: '대구'},
            {value: "경북", label: '경북'},
            {value: "울산", label: '울산'},
            {value: "경남", label: '경남'},
            {value: "부산", label: '부산'},
        ]
    )

    const genreoptions = useMemo(
        () => [
            {value: "musical", label: '뮤지컬'},
            {value: "concert", label: '콘서트'},
            {value: "act", label: '연극'},
            {value: "opera", label: '오페라'},
            {value: "busking", label: '버스킹'},
            {value: "art", label: '전시/미술'},
            {value: "other", label: '기타'},
        ]
    )


    const handleSubmit = (e) => {
    
    }
    // 제출 관련 코드 작성해야 함


    return (
        <div className='container'>
            <div className='window-select'>
                <div className='overlay'></div>
                <div className='content'>
                    <div className='welcome'>Personal Options</div>
                    <div className='infoTable'>
                    <form onSubmit={(e)=> e.preventDefault()}>
                        <div className='local'>관심지역 선택</div>
                            <Select class='dropbox' options={localoptions} placeholder='관심지역 선택' />
                        <div className='genre'>관심장르 선택</div>
                            <Select class='dropbox' options={genreoptions} placeholder='관심장르 선택' />
                    </form>
                    <div className='spacing-PO'>관심지역과 관심장르를 선택해 주세요. 이 옵션은 나중에 마이페이지에서도 변경할 수 있습니다</div>
                    <div> <Link to="/showpage"> <button className='choicebtn' type='submit' onClick={handleSubmit}>SUBMIT</button> </Link> </div>
                    </div>
                </div>
            </div>
        </div>
    )



}


export default Moreinfo


