import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let{title, description,imageUrl,newsUrl, author, date}= this.props;

    return (
      <div>
        
        <div className="card">
      <img src={!imageUrl?"https://regmedia.co.uk/2016/01/08/surveillance_graffiti_image_via_shutterstock.jpg":imageUrl} className="card-img-top" style={{height:'120px'}} alt="images"/>
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <p className='card-text muted'><small>by {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
        <a href={newsUrl} target="_black" className="btn btn-primary">Read More</a>
      </div>
    </div>
    </div>
    )
  }
}
