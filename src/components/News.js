// rce${this.props.api_key}
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    
    static defaultProps = {
        pageSize: 12,
        api_key: process.env.REACT_APP_DEFAULT_NEWS_API_KEY,
        country: "us",
        category: "general",
    }
    static propTypes = {
        country: PropTypes.string,
        api_key: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 0,
            totalResults: 0
        };
        document.title = `${this.capitalize(this.props.category)} - VerifiedNews`;
    };
    capitalize = (str) =>  {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    LoadingBar = true;
    async componentDidMount() {

        
        if (this.LoadingBar) this.props.setProgress(10);
        this.setState({  loading: true });

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.api_key}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;

        let data = await fetch(url);
        if(this.LoadingBar) this.props.setProgress(30);

        let parsedData = await data.json();
        if(this.LoadingBar) this.props.setProgress(70);

        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        if(this.LoadingBar) this.props.setProgress(100);
        this.LoadingBar = false;
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1, loading: true });

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.api_key}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page,
            articles: this.state.articles.concat(parsedData.articles),
            loading: false
        });
    };
    render() {
        return (
            <>
                <div className='container-fluid my-3 mx-auto'>
                    <div className="row text-center" style={{marginTop:'80px'}}>
                        <h2>Top {this.capitalize(this.props.category)} Headlines</h2>
                        {this.state.loading && <Spinner />}
                    </div>
                    <div className="row g-4 justify-content-evenly my-2 row-cols-xxl-auto">
                        {
                            // eslint-disable-next-line
                            this.state.articles.map((element) => {
                                return (
                                    <div className="col-auto" key={element.url ? element.url : ""}>
                                        <NewsItem title={element.title ? element.title : ""}
                                            description={element.description ? element.description : ""}
                                            imageUrl={element.urlToImage ? element.urlToImage : ""}
                                            newsUrl={element.url ? element.url : ""} 
                                            author={element.author ? element.author : "unknown"} 
                                            date={element.publishedAt ? element.publishedAt : ""}
                                            source={element.source.name}/>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={this.state.loading && <h1 className='text-center'><Spinner /></h1>} >
                </InfiniteScroll>
            </>
            
        )
    }
}

export default News

