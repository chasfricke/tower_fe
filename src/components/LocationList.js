import React, { Component } from 'react';

export class LocationList extends Component {
    constructor (props) {
        super(props)
        this.state = {}

        this.updateLocation = this.updateLocation.bind(this)
        this.submitLocation = this.submitLocation.bind(this)
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
        this.setState({
            name: location.name,
            id: location.id,
            business_type: location.business_type,
            address: location.address
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
        event.preventDefault();

    } 
    submitLocation = () => {
        const body = {
            name: this.state.name,
            business_type: this.state.business_type,
            address: this.state.address
        }
        fetch('https://tower-be.herokuapp.com/locations/' + this.state.id, {
            body: JSON.stringify(body),
            method: 'UPDATE',
            headers: new Headers({
                 'Content-Type': 'application/json'
            })
        }).catch(error => console.error('Error', error))
    }


    render () {
        return (
            <div>
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
            <form onSubmit={this.submitLocation}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} required />
                <label htmlFor="business_type">Business Type</label>
                <input type="text" name="business_type" value={this.state.business_type} onChange={this.handleChange} required />
                <label htmlFor="address">Address</label>
                <input type="text" name="address" value={this.state.address} onChange={this.handleChange} required /> 
                <button type="submit">Submit</button>
            </form>
            </div>

        ) 
    }
}

export default LocationList;