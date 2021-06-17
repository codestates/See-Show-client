import React from "react";
import "./SearchBar.css"

function SearchBar({areaFiltered, hanldeAreaState, handleInputValue}){
    return(
      <div className="searchbar-body">

        <div class="searchbar-form-box">
        <input class="searchbar-form-search" type="text" size="25" placeholder="공연 정보 검색" onChange={handleInputValue}/>
        <button className="searchbar-form-button"><img class="searchbtn" src="/resource/icons/search.png"></img></button>
        </div>


          <label for=""></label>
          <select className="select-search-location" onChange={hanldeAreaState}>
             <option value='' disabled selected >지역별 검색</option>
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
          <button onClick={areaFiltered} >검색</button>
          </div>

    )
}

export default SearchBar;



