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

  api_key ="e473764d45744824ba8f520f8baff2fa";
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


  // router = createBrowserRouter([

  //   {
  //     path: "/",
  //     element: <RootLayout/>,
  //     children: [

  //       {
  //         path: '/',
  //         element: <News api_key={this.api_key} />
  //       },
  //       {
  //         path: "/business",
  //         element: <News pageSize={this.pageSize} category="business" api_key={this.api_key} country={this.country} />
  //       },
  //       {
  //         path: "/entertainment",
  //         element: <News pageSize={this.pageSize} category="entertainment" api_key={this.api_key} country={this.country} />
  //       },
  //       {
  //         path: "/general",
  //         element: <News pageSize={this.pageSize} category="general" api_key={this.api_key} country={this.country} />
  //       },
  //       {
  //         path: "/health",
  //         element: <News pageSize={this.pageSize} category="health" api_key={this.api_key} country={this.country} />
  //       },
  //       {
  //         path: "/science",
  //         element: <News pageSize={this.pageSize} category="science" api_key={this.api_key} country={this.country} />
  //       },
  //       {
  //         path: "/sports",
  //         element: <News pageSize={this.pageSize} category="sports" api_key={this.api_key} country={this.country} />
  //       },
  //       {
  //         path: "/technology",
  //         element: <News pageSize={this.pageSize} category="technology" api_key={this.api_key} country={this.country} />
  //       }
  //     ]
  //   }
  // ]);