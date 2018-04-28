import React, { Component } from 'react';
import './App.css';
import GoogleMap from "./components/Map"




class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      locations: []
    }
  }

  componentDidMount() {
    this.getLocations()
  }

  getLocations = () => {
    return fetch('https://tower-be.herokuapp.com/locations')
    .then(response => response.json())
    .then(data => this.setState({ locations: data.locations}))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>S&K Market Map</h1>
        </header>
        <GoogleMap locations={this.state.locations} />
      </div>
    );
  }
}

export default App;
