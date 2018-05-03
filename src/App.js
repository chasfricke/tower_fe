import React, { Component } from 'react';
import './App.css';
import GoogleMap from './components/Map';
import LocationList from './components/LocationList';



class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      locations: [],
      dropoff_details: []
    }
  }

  componentDidMount() {
    this.getLocations()
    this.getDropoffDetails()
  }

  getLocations = () => {
    return fetch('https://tower-be.herokuapp.com/locations')
    .then(response => response.json())
    .then(data => this.setState({ locations: data.locations}))
  }

  getDropoffDetails = () => {
    return fetch('https://tower-be.herokuapp.com/dropoff_details')
    .then(response => response.json())
    .then(data => this.setState({ dropoff_details: data.dropoff_details}))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>S&K Market Map</h1>
        </header>
        <GoogleMap locations={this.state.locations} />
        <LocationList locations={this.state.locations} dropoff_details={this.state.dropoff_details}/>
      </div>
    );
  }
}

export default App;
