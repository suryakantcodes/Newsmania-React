import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 5,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMania`;
  }

  async updateNews() {
    this.props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=07090271920242369a892cab609da24d&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({articles:parsedData.articles,
    //   totalResults: parsedData.totalResults,
    // loading: false})
    this.updateNews();
  }

  // handlePrevClick = async () => {
  //   // console.log("Previous button is clicked");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=07090271920242369a892cab609da24d&pageSize=${this.props.pageSize}&page=${this.state.page -1}`;
  //   // this.setState({loading:true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({
  //   //   page: this.state.page-1,
  //   //   articles:parsedData.articles,
  //   //   loading:false
  //   // })
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  // handleNextClick = async () => {
  //   // console.log("Next button is clicked")
  //   // if(!(this.state.page +1 >Math.ceil(this.state.totalResults/this.props.pageSize))){

  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=07090271920242369a892cab609da24d&pageSize=${this.props.pageSize}&page=${this.state.page +1}`;
  //   //   this.setState({loading:true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({
  //   //   page:this.state.page +1,
  //   //   articles:parsedData.articles,
  //   //   loading:false
  //   // })
  //   // }
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };


  fetchMoreData = async() => {
    this.setState({page: this.state.page +1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        
          <h2 className="text-center">
            NewsMania - All Headlines on{" "}
            {this.capitalizeFirstLetter(this.props.category)} Category
          </h2>
          {/* {this.state.loading && <Spinner/>} */}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          >
           <div className="container">
          <div className="row mx-4 my-3">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    date={element.publishedAt}
                    author={element.author}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div> 
        
          </InfiniteScroll>
          {/* <div className="container my-3 d-flex justify-content-between">
          <button type="button" className="btn btn-dark mx-3" onClick={this.handlePrevClick} disabled={this.state.page<=1}>&larr; Previous</button>
          <button type="button" className="btn btn-dark mx-3" onClick={this.handleNextClick} disabled= {this.state.page +1 >Math.ceil(this.state.totalResults/15)}>Next &rarr;</button>
          </div> */}
        
      </>
    );
  }
}

export default News;

// let url = `https://newsapi.org/v2/top-headlines?country=india&category=business&apiKey=07090271920242369a892cab609da24d&pageSize=${this.props.pageSize}&page=${this.state.page +1}`;
