import React from "react";
import axios from "axios";

function SearchBar(){
    return(
        <tr>
        <td>
          <input type={"text"} size={"25"} placeholder={"공연 정보 검색"} />
        </td>
        <td>
          <label for=""></label>
          <select name="">
            <option value="">ㅇㅇㅇ</option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </td>
        <td>
          <label for=""></label>
          <select name="">
            <option value="">ㅇㅇㅇ</option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </td>
        <td>
          <label for=""></label>
          <select name="">
            <option value="">ㅇㅇㅇ</option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </td>
      </tr>

    )
}

export default SearchBar;