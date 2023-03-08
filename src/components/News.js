// rce${this.props.api_key}
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    
    static defaultProps = {
        pageSize: 12,
        api_key: "3620ddc54ad84cdbbad767e52bb27357",
        country: "us",
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        api_key: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        };
    };

    
    // It runs after render function
    componentDidMount(){ this.updateNews(this.state.page);}

    handlePrevClick = () => this.updateNews(this.state.page - 1);
    
    handleNextClick = () => this.updateNews(this.state.page + 1);
    
    async updateNews(value) {

        this.setState({ loading: true });

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.api_key}&page=${value}&pageSize=${this.props.pageSize}&category=${this.props.category}`;

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: value,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }
    render() {
        return (
            <>
                <div className='container-fluid my-3'>
                    <div className="row text-center">
                        <h2>Top Headlines</h2>
                        {this.state.loading && <Spinner/>}
                    </div>
                    <div className="row g-3 justify-content-evenly my-2 mx-auto row-cols-xxl-4 ">
                        {
                            // eslint-disable-next-line
                            !this.state.loading && this.state.articles.map((element) => {
                                return (
                                    <div className="col-auto" key={element.url ? element.url : ""}>
                                        <NewsItem title={element.title ? element.title : ""}
                                            description={element.description ? element.description : ""}
                                            imageUrl={element.urlToImage ? element.urlToImage : ""}
                                            newsUrl={element.url ? element.url : ""} 
                                            author={element.author ? element.author : "unknown sources"} 
                                            date={element.publishedAt ? element.publishedAt : ""}
                                            source={element.source.name}/>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="container-fluid p-3 rounded m-auto mb-2 bg-dark bg-opacity-25">
                    <div className="row">
                        <div className="col-auto">
                            <button type="button" disabled={this.state.page === 1} className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
                        </div>
                        <div className="col-auto ms-auto">
                            <button type="button" onClick={this.handleNextClick} disabled={(this.state.page + 1  > Math.floor(this.state.totalResults / this.props.pageSize))} className="btn btn-primary" >Next &rarr;</button>
                        </div>
                    </div>
                </div>
            </>
            
        )
    }
}

export default News

