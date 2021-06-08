import React from "react";
import axios from "axios";
import SearchBar from "../Components/SearchBar";
import DataList from "../Components/DataList";
import ClickedDataEntry from "../Components/ClickedDataEntry"

axios.defaults.withCredentials = true;

class ShowPage extends React.Component {
  state = {
    apiData: [
      {
        id: "1234",
        title: "fakeData로 테스트 중...",
        thumbnail:
          "https://media.discordapp.net/attachments/850245968484892683/851451334245875772/See-Show.png",
      },
      {
        id: "1235",
        title: "fakeData로 테스트 중...",
        thumbnail:
          "https://media.discordapp.net/attachments/850245968484892683/851451334245875772/See-Show.png",
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
        <div>
        <SearchBar></SearchBar>
        {this.state.clickedData === null ? (
          <div>
            
              <DataList
                datas={this.state.apiData}
                handleClickedData={this.setClickedData.bind(this)}
              ></DataList>
            
          </div>
        ) : <ClickedDataEntry data={this.state.clickedData}></ClickedDataEntry>}
        {/* // 클릭한 공연 상세정보 출력 */}
        {/* 상세정보에서 뒤로가기 버튼 누르면 clickedData = null 로 변경하는 코드 구현 필요. */}
        </div>
    );
  }
}

export default ShowPage;
