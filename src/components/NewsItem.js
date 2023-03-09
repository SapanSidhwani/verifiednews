// rce
import React, { Component } from 'react';
import defaultImg from './img/default-img.png';
function imgerror(event) {
    event.currentTarget.src =defaultImg;
}
export class NewsItem extends Component {
    
  render(props) {
      let { title, description, imageUrl, newsUrl,author, date, source } = this.props;
    return (
        <div className="card h-100 mx-auto" style={{width: "18rem"}}>
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '50%', zIndex: '1'}}>{source}</span>
            <img src={imageUrl === "" ? defaultImg:imageUrl } className="card-img-top" alt="..." onError={imgerror}/>
            <div className="card-header">
                <p className="card-text">
                    <small className="text-dark">By { author } <br/>on {new Date(date).toGMTString()} </small>
                </p>
            </div>  
            <div className="card-body">
                <h5 className="card-title">{ title }</h5>
                <p className="card-text">{ description }</p>
            </div>
            <div className="card-footer">
                {/* eslint-disable-next-line */}
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary mt-auto d-block">read more</a>
            </div>
        </div>
    )
  }
}

export default NewsItem
