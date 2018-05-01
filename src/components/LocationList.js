import React, { Component } from 'react';

export class LocationList extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    deleteLocation = (location) => {
        if (window.confirm("Delete location: " + location.name + " @ " + location.address)){
            return fetch('https://tower-be.herokuapp.com/locations/' + location.id, {
                method: 'DELETE',
                headers: new Headers({
                'Content-Type': 'application/json'
                })
            }).catch(error => console.error('Error', error))
        } 
    }

    updateLocation = (location) => {
        console.log("update clicked " + location.name + location.id)
    }

    render () {
        return (
            <ul className="locations-list">
                {this.props.locations.map(location => {
                        return (
                            <li className="location-card">
                                <h4>{location.name}</h4>
                                <p>ID: {location.id}</p>
                                <p>{location.business_type}</p>
                                <p>{location.address}</p>
                                <button onClick={() => this.deleteLocation(location)}>Delete</button>     
                                <button onClick={() => this.updateLocation(location)}>Update</button>                     
                            </li>
                        )
                    })}
            </ul>

        ) 
    }
}

export default LocationList;