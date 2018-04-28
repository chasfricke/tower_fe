import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMap from "./components/Map"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>S&K Market Map</h1>
        </header>
        <GoogleMap />
      </div>
    );
  }
}

export default App;
