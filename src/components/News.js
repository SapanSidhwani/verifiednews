// rce
import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    document.title = `${capitalize(props.category)} - VerifiedNews`;

    let loadingBar = true;
    const updateNews = async () => {

        loadingBar && props.setProgress(10);
        setLoading(true);

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.api_key}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`;

        let data = await fetch(url);
        loadingBar && props.setProgress(30);

        let parsedData = await data.json();
        loadingBar && props.setProgress(70);

        setPage(page);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

        loadingBar && props.setProgress(100);
        loadingBar = false;
    }
    useEffect(() => {

        updateNews();
        // eslint-disable-next-line
    }, [])
    const fetchMoreData = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.api_key}&page=${page + 1}&pageSize=${props.pageSize}&category=${props.category}`;

        let data = await fetch(url);
        let parsedData = await data.json();

        setPage(page + 1);
        setArticles(articles.concat(parsedData.articles));
    };

    return (
        <>
            <div className='container-fluid my-3 mx-auto'>
                <div className="row text-center" style={{ marginTop: '80px' }}>
                    <h2>Top {capitalize(props.category)} Headlines</h2>
                    {loading && <Spinner />}
                </div>
                <div className="row g-4 justify-content-evenly my-2 row-cols-xxl-auto">
                    {
                        articles.map((element) => {
                            return (
                                <div className="col-auto" key={element.url ? element.url : ""}>

                                    <NewsItem title={element.title ? element.title : ""}
                                        description={element.description ? element.description : ""}
                                        imageUrl={element.urlToImage ? element.urlToImage : ""}
                                        newsUrl={element.url ? element.url : ""}
                                        author={element.author ? element.author : "unknown"}
                                        date={element.publishedAt ? element.publishedAt : ""}
                                        source={element.source.name} />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<h1 className='text-center'><Spinner /></h1>} >
            </InfiniteScroll>
        </>

    );

}

News.defaultProps = {
    pageSize: 12,
    api_key: process.env.REACT_APP_DEFAULT_NEWS_API_KEY,
    country: "us",
    category: "general",
}
News.propTypes = {
    country: PropTypes.string,
    api_key: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
}
export default News
