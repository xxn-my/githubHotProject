import React from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Header from "@/components/Header";

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowApi: "",
      nowList: [],
      pageNum: 1,
      loading: false,
      hasMore: true,
      // tip: "loading",
      errFlag: false,
      error: "",
    };
  }

  //

  // 点击切换  页面刷新
  async componentDidMount() {
    window.addEventListener("hashchange", () => {
      this.getData(this.changeUrl());
    });
    window.addEventListener("load", () => {
      this.getData(this.changeUrl());
    });
  }

  search = async () => {
    console.log("滚动触发了");
    this.setState({
      loading: true,
      // tip: "请稍等",
      hasMore: true,
      // error:'loading.....'
      errFlag: false,
    });
    const { nowApi, pageNum, nowList } = this.state;
    await axios({
      method: "get",
      url: nowApi,
      params: {
        page: pageNum,
      },
    })
      .then((res) => {
        this.setState({
          nowList: [...nowList, ...res.data.items].slice(0, pageNum * 10),
          pageNum: pageNum + 1,
          loading: false,
          errFlag: false,
          // error:'loading.....'
          // tip: "请稍等",
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          // tip: "请求超时",
          hasMore: false,
          error: err.response.statusText,
          errFlag: true,
        });
      });
  };

  getData = async (nowUrl) => {
    this.setState({
      loading: true,
      // tip: "请稍等",
      hasMore: true,
      // error:'loading.....'
      errFlag: false,
    });
    await axios
      .get(nowUrl)
      .then((res) => {
        this.setState({
          loading: false,
          // tip: "请稍等",
          nowList: res.data.items.slice(0, 10),
          // error:'loading.....',
          errFlag: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          // tip: "请求超时",
          hasMore: false,
          error: err.response.statusText,
          errFlag: true,
        });
      });
  };

  changeUrl = () => {
    this.setState({
      nowList: [],
      pageNum: 1,
      loading: true,
      // tip: "请稍等",
      hasMore: true,
      // error:'loading.....'
      errFlag: false,
    });
    const lang = window.location.hash.split("=")[1];
    // console.log('设置的时候', window.location.hash.split('=')[1]);
    let nowUrl =
      "https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories";
    if (lang === "All" || lang === undefined) {
      nowUrl =
        "https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories";
    } else {
      nowUrl = `https://api.github.com/search/repositories?q=stars:%3E1+language:${lang}&sort=stars&order=desc&type=Repositories`;
    }
    console.log(nowUrl);
    this.setState({
      nowApi: nowUrl,
      loading: true,
      // tip: "请稍等",
      hasMore: true,
      errFlag: false,
      // error:'loading.....'
    });
    return nowUrl;
  };

  render() {
    const { loading, hasMore, error, errFlag } = this.state;
    console.log("error--->", errFlag, error);
    return (
      <div>
        <Header />
        <InfiniteScroll
          pageStart={1}
          loadMore={this.search}
          hasMore={!loading && hasMore}
          useWindow
          loader={
            <div className="loader" style={{ height: "50px" }} key={0}>
              {error}
            </div>
          }
          // loader={<div className="loader" key={0}><p style={{ textAlign: "center" }}>{error}</p></div>}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexFlow: "row wrap",
              marginTop: "10px",
            }}
          >
            {this.state.nowList.map((item, key) => (
              <Card item={item} index={key} key={key} />
            ))}
          </div>
          {errFlag ? (
            <h3 style={{ textAlign: "center" }}>{error}</h3>
          ) : (
            <h3 style={{ textAlign: "center" }}>loading..</h3>
          )}
        </InfiniteScroll>

        <Footer>
          <span>版权所有 &copy; xxn</span>
        </Footer>
      </div>
    );
  }
}
export default Popular;
