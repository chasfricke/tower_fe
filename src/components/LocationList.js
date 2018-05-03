import React, { Component } from 'react';

export class LocationList extends Component {
    constructor (props) {
        super(props)
        this.state = {}

        this.populateUpdateForm = this.populateUpdateForm.bind(this)
        this.updateLocation = this.updateLocation.bind(this)
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

    populateUpdateForm = (location) => {
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

    updateLocation = (event) => {
        event.preventDefault()
        return fetch('https://tower-be.herokuapp.com/locations/' + this.state.id, {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: new Headers({
                 'Content-Type': 'application/json'
            })
        }).then(response => response.json())
        .catch(error => console.error('Error', error))
    }

    createLocation = (event) => {
        event.preventDefault()
        const date = new Date().toJSON().slice(0,10)
        this.setState({"first_visit": date })
        return fetch('https://tower-be.herokuapp.com/locations/', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers({
                 'Content-Type': 'application/json'
            })
        }).then(response => response.json())
        .catch(error => console.error('Error', error))
    }

    populateNoteForm = (location) => {
        this.setState({
            name: location.name,
            foreign_key: location.id,
            address: location.address
        })
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
                            <button onClick={() => this.populateUpdateForm(location)}>Update</button>
                            {this.props.dropoff_details.map(detail => {
                                if (location.id === detail.foreign_key) {
                                    return (
                                        <div className="message">
                                            <p>{detail.visit_date.slice(0,10)}</p>
                                            <p>{detail.comment}</p>
                                            <p> - {detail.staff_name}</p>
                                        </div>
                                    )                                      
                                }
                            })}
                            <button onClick={() => this.populateNoteForm(location)}>Add Note</button>                 
                        </li>
                    )
                })}
            </ul>
            <div className="location-form-container">
                <h3>Update Location</h3>
                <form className="location-form" onSubmit={this.updateLocation}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} required />
                    <label htmlFor="business_type">Business Type</label>
                    <input type="text" name="business_type" value={this.state.business_type} onChange={this.handleChange} required />
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" value={this.state.address} onChange={this.handleChange} required /> 
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="location-form-container">
                <h3>New Location</h3>
                <form className="location-form" onSubmit={this.createLocation}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name"  onChange={this.handleChange} required />
                    <label htmlFor="business_type">Business Type</label>
                    <input type="text" name="business_type" onChange={this.handleChange} required />
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" onChange={this.handleChange} required /> 
                    <label htmlFor="latitude">Latitude</label>
                    <input type="float" name="latitude" onChange={this.handleChange} required /> 
                    <label htmlFor="longitude">Longitude</label>
                    <input type="float" name="longitude" onChange={this.handleChange} required /> 
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="location-form-container">
                <h3>Add Note</h3>
                <h4>{this.state.name}</h4>
                <p>{this.state.address}</p>
                <form onSubmit={() => this.createNote(this.state.foreign_key)}>
                    <label htmlFor="comment">Comment</label>
                    <input type="textarea" name="comment" required />
                    <label htmlFor="staff_name">Your Name</label>
                    <input type="text" name="staff_name" required />
                    <button type="submit">Submit</button>
                </form>   
            </div>
            </div>

        ) 
    }
}

export default LocationList;