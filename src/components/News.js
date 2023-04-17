import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
//   articles = []

static defaultProps={
  country:'in',
  PageSize:9,
  category:"general",
}
static propTypes={
  country: PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}

capFirstLetter=(string)=>{
  return string.charAt(0).toUpperCase()+ string.slice(1);
}
constructor(props){
  super(props);
  console.log("Hello i am a constructor from News component");
  this.state = {
    articles:[] ,//this.articles,
    loading: false,
    page:1
  } 
  document.title=` ${this.capFirstLetter(this.props.category)}-NewsMonkey `;
}

async componentDidMount(){
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dcbf098b866d485fa07bcb29d584215b&page=1&pageSize=${this.props.pageSize}`;
  (this.setState({loading:true}));
  let data= await fetch(url);
  let parseData= await data.json()
  console.log(parseData);
  this.setState({
    articles: parseData.articles,
    totalarticles:parseData.totalResults,
  loading:false
})
}
handlePrevClick=async ()=>{
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dcbf098b866d485fa07bcb29d584215b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  (this.setState({loading:true}));
  let data= await fetch(url);
  let parseData= await data.json()
  console.log(parseData);

  this.setState({
    page: this.state.page - 1,
    articles: parseData.articles,
  })
}
handleNextClick=async ()=>{
  if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/9))){

  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dcbf098b866d485fa07bcb29d584215b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  (this.setState({loading:true}));
  let data= await fetch(url);
  let parseData= await data.json()
  

  this.setState({
    page: this.state.page+1,
    articles: parseData.articles,
    loading:false
  })
}
}

render() {
  return (
    <>
    <div className="container my-3">
      <h2 className='text-center py-3'>NewsMonkey - Top {this.capFirstLetter(this.props.category)} Headlines</h2>
      {this.state.loading && <Spinner/>}
      <div className="row">
        {!this.state.loading && this.state.articles.map((element) => {
          return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 90):""} newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt}/>
          </div>
        })}

      </div>
    
    <div className="container my-3 d-flex justify-content-between">
      <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
      <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/9)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
    </div>
    </div>
    </>
  )
}
}

