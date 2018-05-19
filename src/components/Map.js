import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react'
import React, { Component } from 'react'
import LocationList from './LocationList';

export class GoogleMap extends Component {
    constructor (props) {
        super(props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
        let locations = this.props.locations
        let id = this.state.selectedPlace.id
        const result = locations.filter(location => location.id === id);
        this.setState({selectedPlace: result[0]})
    }
        

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
              showingInfoWindow: false,
              activeMarker: null,
              selectedPlace: {}
            })
        } 
    }

    onWindowClose = () => {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null,
            selectedPlace: {}
          })
    }

    render () {
        return (
            <div className="mapContainer">
                <Map className="Google-Map"
                    google={this.props.google}
                    zoom={12}
                    ControlPosition="BOTTOM_LEFT"
                    initialCenter={{ lat: 39.731214, lng: -104.887431 }}
                    containerStyle={{height: '50vh', width: '100vw'}}
                    onClick={this.onMapClicked}>
                    {this.props.locations.map(location => {
                        return <Marker key={location.name} name={location.name} address={location.address} id={location.id} onClick={this.onMarkerClick} position={{lat: location.latitude, lng: location.longitude}} />
                    })}

                    <InfoWindow
                        onClose={this.onWindowClose}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                            <div>
                                <h4>{this.state.selectedPlace.name}</h4>
                                <p>{this.state.selectedPlace.address}</p>
                            </div>
                    </InfoWindow>
                </Map>
                <LocationList locations={this.props.locations} dropoff_details={this.props.dropoff_details} selectedPlace={this.state.selectedPlace} />
            </div>
        ) 
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyACMzoDHnRLpDW5djZ-6Bp940PKwgnV4Wo'
})(GoogleMap)