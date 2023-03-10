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
import React, { useState } from 'react';

function RootLayout(){

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
function App(){

  const api_key = process.env.REACT_APP_NEWS_API_KEY;
  const country = "in";
  const pageSize = 30;

  const [progress, setProgress] = useState(0);

  const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>

          <Route index path="/"
                 element={<News key="general1" setProgress={setProgress} pageSize={pageSize} category="general" api_key={api_key} country={country} />} />

          <Route exact path="/business" 
                 element={<News key="business" setProgress={setProgress} pageSize={pageSize} category="business" api_key={api_key} country={country} />} />
    
          <Route exact path="/entertainment" 
                 element={<News key="entertainment" setProgress={setProgress} pageSize={pageSize} category="entertainment" api_key={api_key} country={country} />} />
    
          <Route exact path="/general" 
                 element={<News key="general" setProgress={setProgress} pageSize={pageSize} category="general" api_key={api_key} country={country} />} />
    
          <Route exact path="/health" 
                 element={<News key="health" setProgress={setProgress} pageSize={pageSize} category="health" api_key={api_key} country={country} />} />
    
          <Route exact path="/science" 
                 element={<News key="science" setProgress={setProgress} pageSize={pageSize} category="science" api_key={api_key} country={country} />} />
    
          <Route exact path="/sports" 
                 element={<News key="sports" setProgress={setProgress} pageSize={pageSize} category="sports" api_key={api_key} country={country} />} />
    
          <Route exact path="/technology" 
                 element={<News key="technology" setProgress={setProgress} pageSize={pageSize} category="technology" api_key={api_key} country={country} />} />
    
        </Route>
      )
    );
  return (
    <>
      <LoadingBar height={3} color='#f11946' progress={progress}/>
      <RouterProvider router={router} />
      <Outlet/>
    </>
  );
}

export default App