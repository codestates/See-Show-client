import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import DataList from "../Components/DataList";
import ClickedDataEntry from "../Components/ClickedDataEntry";
import RecommendDataList from "../Components/RecommendDataList";

// import './ShowPage.css'


class ShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [ //location
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
      review: [{reviewId : 1, content : '존잼', point : '5'}], //클릭한 공연의 리뷰 리스트
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
      area: "",
      filteredData: null,
      wh : ''
    };
    this.handleApiData = this.handleApiData.bind(this);
    this.setClickedData = this.setClickedData.bind(this);
    this.resetClickedData = this.resetClickedData.bind(this);
    this.getReview = this.getReview.bind(this);
    this.hanldeAreaState = this.hanldeAreaState.bind(this);
    this.getClickedApiData = this.getClickedApiData.bind(this);

    // this.setClicked = this.setClicked.bind(this);
  }

    componentWillMount () {
    console.log("Component WILL MOUNT!");
    console.log(this.state.apiData);
     this.handleApiData();
    console.log(this.state.apiData);

    // this.handleRecommendData();
  }

  handleApiData() {
    // 공연 정보 데이터 불러오기.
    axios.get("https://localhost:8080/recommend/location")
    .then((res) => {
      this.setState({ apiData: res.data.data.list });
    })
    .then(res => axios.get("https://localhost:8080/recommend/genre"))
    .then(res => {
      // const { recommendData } = this.state.recommendData;
      // const newRecommendData = [...recommendData, res.data.list];
      this.setState({ recommendData: res.data.data.list });
    })
    console.log('getApi')

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

  getClickedApiData =  () => {
    //클릭한 공연의 상세 정보 데이터 불러오기.
    axios
      .post("https://localhost:8080/show/detail", this.state.clickedData )
      .then((res) => {
        // console.log(res)
        this.setState({ clickedShowData: res.data.data });
        // console.log(res.data.data,'받아온 res.data');
      })
      .catch((err) => console.log(err));
  };

  async setClickedData (data) {
    //공연 상세정보 뿌려주기 위해 ClickedData setState.
    await this.setState({clickedData: data });
    await this.getClickedApiData(data);
    // await this.getReview();
    console.log('setClickedData')
  }


  

  resetClickedData() {
    //상세보기 에서 뒤로가기 버튼 누를 때, clickedData reset.
    this.setState({ clickedData: null });
  }

  getReview() {
    console.log('getReview')
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

  areaFiltered(e) {
    const value = e.target.value;
    this.setState({ area: value });
    console.log(this.state);
    const filteredData = this.state.apiData.filter(
      (data) => data.area === this.state.area
    );
    this.setState({ filteredData: filteredData });
    console.log(filteredData);
  }

  hanldeAreaState() {
    console.log("filtered");
  }

 

  render() {
    return (
      <div className="show-body">
        <div className="bodyWrapper">
          <div className="searchWrapper">
            <SearchBar areaFiltered={this.areaFiltered}></SearchBar>
          </div>
          
          <div className="mainstream">
            {this.state.clickedData === null ? (
              <div className="apidata">
               <Link to='/addshow'> <button >공연 등록하기</button> </Link>
                <DataList
                  datas={this.state.apiData}
                  handleClickedData={this.setClickedData}
                ></DataList>

                <RecommendDataList
                  recommendData={this.state.recommendData}
                  handleClickedData={this.setClickedData}
                ></RecommendDataList>
              </div>
            ) : (
              <ClickedDataEntry
              isLogin={this.props.isLogin}
              accessToken={this.props.accessToken}
                clickedData={this.state.clickedData}
                resetClickedData={this.resetClickedData}
                review={this.state.review}
                getReview={this.getReview}
              ></ClickedDataEntry>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowPage;
