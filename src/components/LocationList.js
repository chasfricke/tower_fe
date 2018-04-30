import React, { Component } from 'react';

export class LocationList extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    render () {
        return (
            <ul className="locations-list">
                {this.props.locations.map(location => {
                        return (
                            <li>
                                <h4>{location.name}</h4>
                                <p>{location.business_type}</p>
                                <p>{location.address}</p>                          
                            </li>
                        )
                    })}
            </ul>

        ) 
    }
}

export default LocationList;