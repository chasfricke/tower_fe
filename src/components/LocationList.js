import React, { Component } from 'react';
import ReactModal from 'react-modal'

export class LocationList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            showAddLocationModal: false,
            showUpdateLocationModal: false,
            showAddNoteModal: false,
            showUpdateNoteModal: false
        }

        this.populateUpdateForm = this.populateUpdateForm.bind(this)
        this.updateLocation = this.updateLocation.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleOpenAddLocationModal = this.handleOpenAddLocationModal.bind(this)
        this.handleOpenUpdateLocationModal = this.handleOpenUpdateLocationModal.bind(this)
        this.handleOpenUpdateNoteModal = this.handleOpenUpdateNoteModal.bind(this)

    }

    deleteLocation = (location) => {
        if (window.confirm("Delete location: " + location.name + " @ " + location.address)){
            this.handleCloseModal()
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
            address: location.address,
            latitude: location.latitude,
            longitude: location.longitude
        })
        this.handleOpenUpdateLocationModal()
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
        event.preventDefault();
    } 

    updateLocation = (event) => {
        event.preventDefault()
        this.handleCloseModal()
        return fetch('https://tower-be.herokuapp.com/locations/' + this.state.id, {
            method: 'PUT',
            body: JSON.stringify({
                name: this.state.name,
                address: this.state.address,
                business_type: this.state.business_type,
                first_visit: this.state.first_visit,
                latitude: this.state.latitude,
                longitude: this.state.longitude
            }),
            headers: new Headers({
                 'Content-Type': 'application/json'
            })
        }).then(response => response.json())
        .catch(error => console.error('Error', error))
    }

    createLocation = (event) => {
        event.preventDefault()
        this.handleCloseModal()
        const date = new Date().toJSON().slice(0,10)
        this.setState({"first_visit": date })
        return fetch('https://tower-be.herokuapp.com/locations/', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                address: this.state.address,
                business_type: this.state.business_type,
                first_visit: this.state.first_visit,
                latitude: this.state.latitude,
                longitude: this.state.longitude
            }),
            headers: new Headers({
                 'Content-Type': 'application/json'
            })
        }).then(response => response.json())
        .catch(error => console.error('Error', error))
    }

    populateNoteForm = (location) => {

        this.setState({
            showAddNoteModal: true,
            name: location.name,
            foreign_key: location.id,
            address: location.address,
        })
    }

    createNote = (event) => {
        event.preventDefault()
        this.handleCloseModal()
        const date = new Date().toJSON().slice(0,10)
        this.setState({"visit_date": date })
        return fetch('https://tower-be.herokuapp.com/dropoff_details/', {
            method: 'POST',
            body: JSON.stringify({
                foreign_key: this.state.foreign_key,
                comment: this.state.comment,
                staff_name: this.state.staff_name,
                visit_date: date
            }),
            headers: new Headers({
                 'Content-Type': 'application/json'
            })
        }).then(response => response.json())
        .catch(error => console.error('Error', error))
    }

    deleteNote = (detail) => {
        if (window.confirm("Delete note: " + detail.comment)){
            return fetch('https://tower-be.herokuapp.com/dropoff_details/' + detail.id, {
                method: 'DELETE',
                headers: new Headers({
                'Content-Type': 'application/json'
                })
            }).catch(error => console.error('Error', error))
        } 
    }

    populateNoteUpdateForm = (detail, location) => {
        this.handleOpenUpdateNoteModal ()
        this.setState({
            id: detail.id,
            foreign_key: detail.foreign_key,
            name: location.name,
            address: location.address,
            comment: detail.comment,
            staff_name: detail.staff_name,
            visit_date: detail.visit_date.slice(0,10)
        })

    }

    updateNote = (event) => {
        event.preventDefault()
        this.handleCloseModal()
        return fetch('https://tower-be.herokuapp.com/dropoff_details/' + this.state.id, {
            method: 'PUT',
            body: JSON.stringify({
                foreign_key: this.state.foreign_key,
                comment: this.state.comment,
                staff_name: this.state.staff_name,
                visit_date: this.state.visit_date
            }),
            headers: new Headers({
                 'Content-Type': 'application/json'
            })
        }).then(response => response.json())
        .catch(error => console.error('Error', error))
    }

    handleOpenAddLocationModal () {
        this.setState({ showAddLocationModal: true })
    }

    handleOpenUpdateLocationModal () {
        this.setState({ showUpdateLocationModal: true })
    }

    handleOpenAddNoteModal () {
        this.setState({ showAddNoteModal: true })
    }

    handleOpenUpdateNoteModal () {
        this.setState({ showUpdateNoteModal: true })
    }

    handleCloseModal () {
        this.setState({ 
            showAddLocationModal: false,
            showUpdateLocationModal: false,
            showAddNoteModal: false,
            showUpdateNoteModal: false
         });
      }

    render () {
        const selectedPlace = this.props.selectedPlace
        let selectionDetail = null
        if (Object.keys(selectedPlace).length === 0) {
            selectionDetail = 
            <div className="selection-detail-container">
                <div className="selection-detail">
                    {/* <div className="selected-place-title">
                        <h3>Map Selection</h3>
                    </div> */}
                    <div className="location-card">
                        <p>No Location Selected</p>
                    </div>
                </div>
            </div>
        } else {
            selectionDetail = 
            <ul className="selection-detail-container">
                <div className="selection-detail">
                <div className="selected-place-title">
                    <h3>Map Selection</h3>
                </div>
                <li key={"location_" + this.props.selectedPlace.id} className="location-card" id={"location_" + this.props.selectedPlace.id}>
                    <div className="location-card-header">
                        <h3>{this.props.selectedPlace.name}</h3>
                        <p>ID: {this.props.selectedPlace.id}</p>
                    </div>
                    <p className="address">{this.props.selectedPlace.address}</p>
                    <p>{this.props.selectedPlace.business_type}</p>
                    
                    <button onClick={() => this.deleteLocation(this.props.selectedPlace)}>Delete</button> 
                    <button className="update-load-button" onClick={() => this.populateUpdateForm(this.props.selectedPlace)}>Update</button>
                    <hr/>
                        {this.props.dropoff_details.map(detail => {
                            if (this.props.selectedPlace.id === detail.foreign_key) {
                                return (
                                    <div className="message" key={"message_" + detail.id} id={"message_" + detail.id}>
                                        <p>{detail.visit_date.slice(0,10)}</p>
                                        <p>{detail.comment}</p>
                                        <p> - {detail.staff_name}</p>
                                        <button className="delete-note-button" onClick={() => this.deleteNote(detail)}>Delete</button>
                                        <button onClick={() => this.populateNoteUpdateForm(detail, this.props.selectedPlace)}>Update</button>
                                    </div>
                                )                                     
                            } else return null
                        })}
                        <button className="add-note-button" onClick={() => this.populateNoteForm(this.props.selectedPlace)}>Add Note</button>                 
                </li>
                </div>
            </ul>
        }

        return (
            <div>
            {selectionDetail}
            <ul className="locations-list">
                
                <div className="location-list-title">
                    <h3>All Locations</h3>
                    <button onClick={this.handleOpenAddLocationModal}>Add Location</button>
                </div>
                {this.props.locations.map(location => {
                    return (  
                        <li key={"location_" + location.id} className="location-card" id={"location_" + location.id}>
                            <div className="location-card-header">
                                <h3>{location.name}</h3>
                                <p>ID: {location.id}</p>
                            </div>
                            <p>{location.business_type}</p>
                            <p>{location.address}</p>
                            <button onClick={() => this.deleteLocation(location)}>Delete</button>     
                            <button className="update-load-button" onClick={() => this.populateUpdateForm(location)}>Update</button>
                            <hr/>
                            {this.props.dropoff_details.map(detail => {
                                if (location.id === detail.foreign_key) {
                                    return (
                                        <div className="message" key={"message_" + detail.id} id={"message_" + detail.id}>
                                            <p>{detail.visit_date.slice(0,10)}</p>
                                            <p>{detail.comment}</p>
                                            <p> - {detail.staff_name}</p>
                                            <button className="delete-note-button" onClick={() => this.deleteNote(detail)}>Delete</button>
                                            <button onClick={() => this.populateNoteUpdateForm(detail, location)}>Update</button>
                                        </div>
                                    )                                     
                                } else return null
                            })}
                            <button className="add-note-button" onClick={() => this.populateNoteForm(location)}>Add Note</button>                 
                        </li>
                    )
                })}
            </ul>

            <ReactModal
                isOpen={this.state.showAddLocationModal}
                className="modal"
                contentLabel="Add Location Form">
            <div className="location-form-container">
                <h3>Add Location</h3>
                <form id="create-location-form" className="location-form" onSubmit={this.createLocation}>
                    <label htmlFor="name">Business Name</label>
                    <input type="text" id="create-location-name" name="name"  onChange={this.handleChange} required />
                    <label htmlFor="business_type">Business Type</label>
                    <input type="text" id="create-location-business_type" name="business_type" onChange={this.handleChange} required />
                    <label htmlFor="address">Address</label>
                    <input type="text" id="create-location-address" name="address" onChange={this.handleChange} required /> 
                    <label htmlFor="latitude">Latitude</label>
                    <input type="float" id="create-location-latitude" name="latitude" onChange={this.handleChange} required /> 
                    <label htmlFor="longitude">Longitude</label>
                    <input type="float" id="create-location-longitude" name="longitude" onChange={this.handleChange} required /> 
                    <div className="form-buttons">
                        <button id="create-location-button" type="submit">Submit</button>
                        <button onClick={this.handleCloseModal}>Cancel</button>
                    </div>
                </form>
            </div>
            </ReactModal>

            <ReactModal
                isOpen={this.state.showUpdateLocationModal}
                className="modal"
                contentLabel="Update Location Form">
            <div className="location-form-container">
                <h3>Update Location</h3>
                <form className="location-form" onSubmit={this.updateLocation}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="update-location-name" name="name" value={this.state.name} onChange={this.handleChange} required />
                    <label htmlFor="business_type">Business Type</label>
                    <input type="text" name="business_type" value={this.state.business_type} onChange={this.handleChange} required />
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" value={this.state.address} onChange={this.handleChange} required /> 
                    <label htmlFor="latitude">Latitude</label>
                    <input type="float" name="latitude" value={this.state.latitude} onChange={this.handleChange} required /> 
                    <label htmlFor="longitude">Longitude</label>
                    <input type="float" name="longitude"value={this.state.longitude} onChange={this.handleChange} required />
                    <div className="form-buttons">
                        <button type="submit" id="update-location-button">Submit</button>
                        <button onClick={this.handleCloseModal}>Cancel</button>
                    </div>
                </form>
            </div>
            </ReactModal>

            <ReactModal
                isOpen={this.state.showAddNoteModal}
                className="modal"
                contentLabel="Add Note Form">
            <div className="location-form-container">
                <h3>Add Note</h3>
                <div className="location-details">
                    <h4>{this.state.name}</h4>
                    <p>{this.state.address}</p>
                </div>
                <form className="location-form" id="create-note-form" onSubmit={this.createNote}>
                    <label htmlFor="comment">Comment</label>
                    <textarea cols="50" rows="10" name="comment" onChange={this.handleChange} required />
                    <label htmlFor="staff_name">Staff Name</label>
                    <input type="text" name="staff_name" onChange={this.handleChange} required />
                    <div className="form-buttons">
                        <button type="submit">Submit</button>
                        <button onClick={this.handleCloseModal}>Cancel</button>
                    </div>
                </form>   
            </div>
            </ReactModal>


            <ReactModal
                isOpen={this.state.showUpdateNoteModal}
                className="modal"
                contentLabel="Update Note Form">
            <div className="location-form-container">
                <h3>Update Note</h3>
                <div className="location-details">
                    <h4>{this.state.name}</h4>
                    <p>{this.state.address}</p>
                </div>
                <form className="location-form" onSubmit={this.updateNote}>
                    <label htmlFor="visit_date">Visit Date</label>
                    <input type="text" name="visit_date" value={this.state.visit_date} onChange={this.handleChange} required />
                    <label htmlFor="foreign_key">Location ID</label>
                    <input type="text" name="foreign_key" value={this.state.foreign_key} onChange={this.handleChange} required />
                    <label htmlFor="comment">Comment</label>
                    <textarea cols="50" rows="10" name="comment" value={this.state.comment} onChange={this.handleChange} required />
                    <label htmlFor="staff_name">Staff Name</label>
                    <input type="text" name="staff_name" value={this.state.staff_name} onChange={this.handleChange} required />
                    <div className="form-buttons">
                        <button type="submit">Submit</button>
                        <button onClick={this.handleCloseModal}>Cancel</button>
                    </div>
                </form>   
            </div>
            </ReactModal>
            </div>
        ) 
    }
}

export default LocationList;