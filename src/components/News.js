// rce${this.props.api_key}
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


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

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
        document.title = `${this.capitalize(this.props.category)} - VerifiedNews`;
    };
    capitalize = (str) =>  {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    componentDidMount(){ this.updateNews(this.state.page);}

    async updateNews(value) {

        this.setState({ page: this.state.page + 1, loading: true });

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.api_key}&page=${value}&pageSize=${this.props.pageSize}&category=${this.props.category}`;

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: value + 1,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }
    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1});

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.api_key}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page,
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
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
                    <div className="row g-3 justify-content-evenly my-2 row-cols-xxl-auto">
                        {
                            // eslint-disable-next-line
                            this.state.articles.map((element) => {
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
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<h1 className='text-center'><Spinner /></h1>} >
                </InfiniteScroll>
            </>
            
        )
    }
}

export default News

