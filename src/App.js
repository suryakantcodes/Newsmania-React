import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = {
    progress: 0,
  }
  setProgress = (progress) =>{
      this.setState({progress:progress});
  }

  apiKey = process.env.REACT_APP_NEWS_API
  render() {
    
    return (
     
      <div>
        <LoadingBar
          color="#f11946"
          progress={this.state.progress}
          
        />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route
                exact
                path="general"
                element={
                  <News setProgress={this.setProgress} apiKey = {this.apiKey} 
                    key="a"
                    pageSize={6}
                    country="in"
                    category="general"
                  />
                }
              />
              <Route
                exact
                path="business"
                element={
                  <News setProgress={this.setProgress} apiKey = {this.apiKey} 
                    key="b"
                    pageSize={6}
                    country="in"
                    category="business"
                  />
                }
              />
              <Route
                exact
                path="entertainment"
                element={
                  <News setProgress={this.setProgress} apiKey = {this.apiKey} 
                    key="c"
                    pageSize={6}
                    country="in"
                    category="entertainment"
                  />
                }
              />
              <Route
                exact
                path="health"
                element={
                  <News setProgress={this.setProgress} apiKey = {this.apiKey} 
                    key="d"
                    pageSize={6}
                    country="in"
                    category="health"
                  />
                }
              />
              <Route
                exact
                path="science"
                element={
                  <News setProgress={this.setProgress} apiKey = {this.apiKey} 
                    key="e"
                    pageSize={6}
                    country="in"
                    category="science"
                  />
                }
              />
              <Route
                exact
                path="sports"
                element={
                  <News setProgress={this.setProgress} apiKey = {this.apiKey} 
                    key="f"
                    pageSize={6}
                    country="in"
                    category="sports"
                  />
                }
              />
              <Route
                exact
                path="technology"
                element={
                  <News setProgress={this.setProgress} apiKey = {this.apiKey} 
                    key="g"
                    pageSize={6}
                    country="in"
                    category="technology"
                  />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

// <News setProgress={this.setProgress} apiKey = {this.apiKey}  pageSize={6} country="in" category="technology"/>
