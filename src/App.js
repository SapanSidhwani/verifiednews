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

  api_key ="3620ddc54ad84cdbbad767e52bb27357";
  country = "us";
  pageSize = 12;
  router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<RootLayout/>}>

          <Route index path="/"
                 element={<News key="general" pageSize={this.pageSize} category="general" api_key={this.api_key} country={this.country} />} />

          <Route exact path="/business" 
                 element={<News key="business" pageSize={this.pageSize} category="business" api_key={this.api_key} country={this.country} />} />
    
          <Route exact path="/entertainment" 
                 element={<News key="entertainment" pageSize={this.pageSize} category="entertainment" api_key={this.api_key} country={this.country} />} />
    
          <Route exact path="/general" 
                 element={<News key="general" pageSize={this.pageSize} category="general" api_key={this.api_key} country={this.country} />} />
    
          <Route exact path="/health" 
                 element={<News key="health" pageSize={this.pageSize} category="health" api_key={this.api_key} country={this.country} />} />
    
          <Route exact path="/science" 
                 element={<News key="science" pageSize={this.pageSize} category="science" api_key={this.api_key} country={this.country} />} />
    
          <Route exact path="/sports" 
                 element={<News key="sports" pageSize={this.pageSize} category="sports" api_key={this.api_key} country={this.country} />} />
    
          <Route exact path="/technology" 
                 element={<News key="technology" pageSize={this.pageSize} category="technology" api_key={this.api_key} country={this.country} />} />
    
        </Route>
      )
    );

  render(props) {
    return (
      <>
        <RouterProvider router={this.router} />
      </>
    )
  }
}