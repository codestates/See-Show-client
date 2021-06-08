import React from "react";
import axios from "axios";
import SearchBar from "../Components/SearchBar";

axios.defaults.withCredentials = true;

function ShowPage(props) {
  return (
    <table className={""}>
      <h1>ShowPage임</h1>
      <SearchBar></SearchBar>

      {/* 지금 가까운 공연 전시  */}
      <tr></tr>

      {/* 브랜든 님의 취향 저격 공연 전시 */}
      <tr></tr>
    </table>
  );
}

export default ShowPage;
