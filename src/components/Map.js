import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react'
import React, { Component } from 'react'

export class GoogleMap extends Component {
    constructor (props) {
        super(props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }
        

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
              showingInfoWindow: false,
              activeMarker: null
            })
        } 
    }

    onMoreInfoClick = () => {
        console.log("more info")
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
                        return <Marker key={location.name} name={location.name} address={location.address} onClick={this.onMarkerClick} position={{lat: location.latitude, lng: location.longitude}} />
                    })}

                    <InfoWindow
                        onOpen={this.onMoreInfoClick}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                            <div>
                                <h4>{this.state.selectedPlace.name}</h4>
                                <p>{this.state.selectedPlace.address}</p>
                            </div>
                    </InfoWindow>
                </Map>
            </div>
        ) 
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyACMzoDHnRLpDW5djZ-6Bp940PKwgnV4Wo'
})(GoogleMap)