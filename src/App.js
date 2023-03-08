import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

// rcc -start
import React, { Component } from 'react';

function RootLayout(props) {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
export default class App extends Component {

  api_key = process.env.REACT_APP_NEWS_API_KEY;
  country = "us";
  pageSize = 12;

  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({progress})
  }

  router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<RootLayout/>}>

          <Route index path="/"
                 element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} category="general" api_key={this.api_key} country={this.country} />} />

          <Route exact path="/business" 
                 element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} category="business" api_key={this.api_key} country={this.country} />} />
    
          <Route exact path="/entertainment" 
                 element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} category="entertainment" api_key={this.api_key} country={this.country} />} />
    
          <Route exact path="/general" 
                 element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} category="general" api_key={this.api_key} country={this.country} />} />
    
          <Route exact path="/health" 
                 element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} category="health" api_key={this.api_key} country={this.country} />} />
    
          <Route exact path="/science" 
                 element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} category="science" api_key={this.api_key} country={this.country} />} />
    
          <Route exact path="/sports" 
                 element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} category="sports" api_key={this.api_key} country={this.country} />} />
    
          <Route exact path="/technology" 
                 element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} category="technology" api_key={this.api_key} country={this.country} />} />
    
        </Route>
      )
    );

  render(props) {
    return (
      <>
        <LoadingBar height={3} color='#f11946' progress={this.state.progress}/>
        <RouterProvider router={this.router} />
      </>
    )
  }
}