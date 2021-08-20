import React from "react";
import axios from "axios";
import { withRouter, Redirect, Link } from "react-router-dom";

import SearchBar from "../Components/SearchBar";
import DataList from "../Components/DataList";
import ClickedDataEntry from "../Components/ClickedDataEntry";
import RecommendDataList from "../Components/RecommendDataList";

import "./ShowPage.css";
import SearchedDataList from "../Components/SearchedDataList";

class ShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [
        //location
        {
          seq: "166695",
          title: "나의 친구, 그림책",
          startDate: "20210102",
          endDate: "20211231",
          place: "ACC 어린이문화원",
          realmName: "미술",
          area: "광주",
          thumbnail:
            "http://www.culture.go.kr/upload/rdf/21/04/rdf_2021042214113608337.gif",
          gpsX: "126.919994481568",
          gpsY: "35.1469155857794",
        },
      ],
      clickedData: null, //클릭한 데이터의 정보
      clickedShowData: "", //클릭한 공연의 상세 정보
      review: [{ reviewId: 1, content: "존잼", point: "5" }], //클릭한 공연의 리뷰 리스트
      recommendData: [
        {
          seq: "166695",
          title: "나의 친구, 그림책",
          startDate: "20210102",
          endDate: "20211231",
          place: "ACC 어린이문화원",
          realmName: "미술",
          area: "광주",
          thumbnail:
            "http://www.culture.go.kr/upload/rdf/21/04/rdf_2021042214113608337.gif",
          gpsX: "126.919994481568",
          gpsY: "35.1469155857794",
        },
      ],
      area: "경기",
      filteredData: null,
      search: "",
      clickedArea: "",
      searchData: '',
      check: 0,
    };
    this.handleApiData = this.handleApiData.bind(this);
    this.setClickedData = this.setClickedData.bind(this);
    this.resetClickedData = this.resetClickedData.bind(this);
    this.getReview = this.getReview.bind(this);
    this.hanldeAreaState = this.hanldeAreaState.bind(this);
    this.getClickedApiData = this.getClickedApiData.bind(this);
    this.areaFiltered = this.areaFiltered.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);
    this.resetCheck = this.resetCheck.bind(this);
  }

  componentWillMount() {
    // console.log("Component WILL MOUNT!");
    // console.log(this.state.apiData);
    this.handleApiData();
    // console.log(this.state.apiData);
    // this.handleRecommendData();
  }

  handleApiData() {
    // 공연 정보 데이터 불러오기.
    axios
      .get(process.env.REACT_APP_DOMAIN+"/recommend/location")
      .then((res) => {
        this.setState({ apiData: res.data.data.list });
      })
      .then((res) => axios.get(process.env.REACT_APP_DOMAIN+"/recommend/genre"))
      .then((res) => {
        // const { recommendData } = this.state.recommendData;
        // const newRecommendData = [...recommendData, res.data.list];
        this.setState({ recommendData: res.data.data.list });
      });
    // console.log("getApi");
  }
  //     if(this.props.accessToken === null) {
  //       axios.get("https://localhost:8080/recommend/location")
  //       .then((res) => {
  //         this.setState({ apiData: res.data.data.list });
  //       })
  //       .then(res => axios.get("https://localhost:8080/recommend/genre"))
  //       .then(res => {
  //         // const { recommendData } = this.state.recommendData;
  //         // const newRecommendData = [...recommendData, res.data.list];
  //         this.setState({ recommendData: res.data.data.list });
  //       })
  //       console.log('getApi')
  //     }else{
  //       axios
  //       .get("https://localhost:8080/recommend/location", {  headers: {
  //         authorization: `Bearer ${this.props.accessToken}`,
  //     }})
  //     .then(res => {
  //       // const { recommendData } = this.state.recommendData;
  //       // const newRecommendData = [...recommendData, res.data.list];
  //       this.setState({ recommendData: res.data.data.list });
  //     })
  //   }
  // }

  getClickedApiData = () => {
    //클릭한 공연의 상세 정보 데이터 불러오기.
    // console.log(this.state.clickedData, 'clickedData')
    axios
      .post(process.env.REACT_APP_DOMAIN+"/show/detail", this.state.clickedData)
      .then((res) => {
        // console.log(res)
        this.setState({ clickedShowData: res.data.data });
        // console.log(res.data.data, "clickedShowData");
      })
      .catch((err) => console.log(err));
  };

  async setClickedData(data) {
    //공연 상세정보 뿌려주기 위해 ClickedData setState.
    await this.setState({ clickedData: data });
    await this.getClickedApiData(data);
    // await this.getReview();
    // console.log("setClickedData");
  }

  resetClickedData() {
    //상세보기 에서 뒤로가기 버튼 누를 때, clickedData reset.
    this.setState({ clickedData: null, clickedShowData: "" });
    // console.log(this.state, "resetClickedDaata");
  }

  getReview() {
    console.log("getReview");
    //   axios
    //     .post(
    //       "https://localhost:8080/review/get",
    //       this.state.clickedData
    //     )
    //     .then((res) => {
    //       console.log(res)
    //       this.setState({ review: res.body.data });
    //     })
    //     .catch((err) => console.log(err, "getReview err"));
    // }
  }

  areaFiltered() {
    this.setState({ clickedData: null });
    axios
      .post(process.env.REACT_APP_DOMAIN+"/show", {
        searchWord: this.state.clickedArea,
      })
      .then((res) => {
        // console.log(res.data.showList);
        this.setState({ searchData: res.data.showList });
      })
      .then((res) => {
        this.setState({ check: 1 });
      });
  }

  hanldeAreaState(e) {
    const value = e.target.value;
    this.setState({ clickedArea: value });
    // console.log(value, "handleAreaState");
    // console.log(this.state.clickedArea, "state.area");
    // this.areaFiltered(value)
  }

  handleInputValue(e) {
    const value = e.target.value;
    // console.log(value);
    this.setState({ search: e.target.value });
    // this.areaFiltered(value)
  }
  resetCheck() {
    this.setState({ check: 0, clickedShowData: "", clickedData: null });
    // console.log(this.state, "resetCheck");
  }

  render() {
    // console.log(this.state, "render");
    //지역별 검색 했을 경우
    if (this.state.check === 1) {
      return (
        <div className="show-body">
          <div className="bodyWrapper">
            <div className="searchWrapper">
              <SearchBar
                areaFiltered={this.areaFiltered}
                handleInputValue={this.handleInputValue}
                hanldeAreaState={this.hanldeAreaState}
              ></SearchBar>
            </div>

            {this.state.clickedData === null ? (
              <div className="mainstream">
                <SearchedDataList
                  resetCheck={this.resetCheck}
                  datas={this.state.searchData}
                  handleClickedData={this.setClickedData}
                ></SearchedDataList>
              </div>
            ) : (
              <ClickedDataEntry
                isLogin={this.props.isLogin}
                accessToken={this.props.accessToken}
                clickedData={this.state.clickedData}
                resetClickedData={this.resetClickedData}
                review={this.state.review}
                getReview={this.getReview}
                clickedShowData={this.state.clickedShowData}
              ></ClickedDataEntry>
            )}
          </div>
        </div>
      );
    } else {
      //가까운 추천공연, 지역 공연
      return (
        <div className="show-body">
          <div className="bodyWrapper">

            <div className="mainstream">
              {this.state.clickedData === null ? (
                <div className="apidata">
                   <div className="searchWrapper">
                     <SearchBar
                        areaFiltered={this.areaFiltered}
                        handleInputValue={this.handleInputValue}
                        hanldeAreaState={this.hanldeAreaState}
                     ></SearchBar>
                   </div>
                  <div className="dataWrapper">
                    <div className="dtitleWrapper">
                      <div className="datatitle">가까운 추천 공연</div>
                    </div>

                    <div className="longpadding">
                      <div className="data1">
                        <div className="thumbnailcontainer">
                          <DataList
                            datas={this.state.apiData}
                            handleClickedData={this.setClickedData}
                          ></DataList>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dataWrapper">
                    <div className="dtitleWrapper">
                      <div className="datatitle">관심사 추천 공연</div>
                    </div>

                    <div className="longpadding">
                      <div className="data2">
                        <div className="thumbnailcontainer">
                          <RecommendDataList
                            recommendData={this.state.recommendData}
                            handleClickedData={this.setClickedData}
                          ></RecommendDataList>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <ClickedDataEntry
                  isLogin={this.props.isLogin}
                  accessToken={this.props.accessToken}
                  clickedData={this.state.clickedData}
                  resetClickedData={this.resetClickedData}
                  review={this.state.review}
                  getReview={this.getReview}
                  clickedShowData={this.state.clickedShowData}
                ></ClickedDataEntry>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(ShowPage);
