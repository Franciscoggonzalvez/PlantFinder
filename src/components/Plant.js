import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {Link} from 'react-router-dom'

export class Plant extends Component{
    static propTypes = {
        //id: PropTypes.string,
        scientific_name: PropTypes.string,
        image_url: PropTypes.string,
    }

    render() {
        const {scientific_name, image_url, id} = this.props

        return (
            <Link to={`/detail/${id}`} className="card">
                <div className="card-image">
                    <figure className="image">
                    <img 
                        src={image_url}
                        alt='Img. not available'/>
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                    <div className="media-content"> 
                        <p className="title is-4">{scientific_name}</p>
                    </div>
                    </div>
                </div>
            </Link>             
        )
    }
}