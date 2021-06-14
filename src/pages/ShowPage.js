import React from "react";
import axios from "axios";
import SearchBar from "../Components/SearchBar";
import DataList from "../Components/DataList";
import Nav from "../pages/Nav"
import ClickedDataEntry from "../Components/ClickedDataEntry"
// import './ShowPage.css'

axios.defaults.withCredentials = true;

class ShowPage extends React.Component {
  state = {
    apiData: [
      {
        seq: { _text: '166695' },
        title: { _text: '나의 친구, 그림책' },
        startDate: { _text: '20210102' },
        endDate: { _text: '20211231' },
        place: { _text: 'ACC 어린이문화원' },
        realmName: { _text: '미술' },
        area: { _text: '광주' },
        thumbnail: {
          _text: 'http://www.culture.go.kr/upload/rdf/21/04/rdf_2021042214113608337.gif'
        },
        gpsX: { _text: '126.919994481568' },
        gpsY: { _text: '35.1469155857794' }
      },
      {
        seq: { _text: '167843' },
        title: { _text: 'PMF 영아티스트 콘서트_이지언 첼로 리사이틀' },
        startDate: { _text: '20210710' },
        endDate: { _text: '20210710' },
        place: { _text: 'PMF자양스테이션' },
        realmName: { _text: '음악' },
        area: { _text: '서울' },
        thumbnail: {
          _text: 'http://www.culture.go.kr/upload/rdf/21/06/rdf_202106081662354418.jpg'
        },
        gpsX: { _text: '127.08302634367884' },
        gpsY: { _text: '37.53463130540217' }
      },
      
    ],
    clickedData: null,
  };

  hanldeApiData() {
    axios
      .get("https://localhost:4000/show")
      .then((res) => {
        this.setState({ apiData: res.data });
      })
      .catch((err) => console.log(err, "handleApiData axios err"));
  }

  setClickedData(data) {
    this.setState({ clickedData: data });
    console.log(this.state.clickedData);
  }

  render() {
    return (
      <div className="show-body">
        <div className="bodyWrapper">
          <div className="searchWrapper">
            <SearchBar></SearchBar>
            </div>
        <div className="mainstream">
            {this.state.clickedData === null ? (
            <div className="apidata">
              <DataList datas={this.state.apiData} handleClickedData={this.setClickedData.bind(this)}></DataList>
           </div>
        ) : <ClickedDataEntry data={this.state.clickedData}></ClickedDataEntry>}
        {/* // 클릭한 공연 상세정보 출력 */}
        {/* 상세정보에서 뒤로가기 버튼 누르면 clickedData = null 로 변경하는 코드 구현 필요. */}
        </div>
        </div>
        </div>
    );
  }
}

export default ShowPage;
