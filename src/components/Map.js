import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import React, { Component } from 'react'

export class GoogleMap extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }


    render () {
        return (
            <div className="mapContainer">
                <Map className="Google-Map"
                    google={this.props.google}
                    zoom={12}
                    ControlPosition="BOTTOM_LEFT"
                    initialCenter={{ lat: 39.731214, lng: -104.887431 }}
                    containerStyle={{height: '50vh', width: '100vw'}}>
                    {this.props.locations.map(location => {
                        return <Marker key={location.name} position={{lat: location.latitude, lng: location.longitude}} />
                    })}
                </Map>
            </div>
        ) 
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyACMzoDHnRLpDW5djZ-6Bp940PKwgnV4Wo'
})(GoogleMap)