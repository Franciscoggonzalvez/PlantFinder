import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {ButtonBackToHome} from '../components/ButtonBackToHome.js'
import {Title} from '../components/Title.js'

const API_KEY = 'rmT15QniWjW_VZOh6PoGm1_xeYQ8jpdNifiAfZoVvBk'

export class Detail extends Component {
    static propTypes = {
        //match contiene un objeto params con todos los parñametros de la url
        match: PropTypes.shape({
            params: PropTypes.object,
            isExact: PropTypes.bool,
            path: PropTypes.string,
            url: PropTypes.string
          })
    }

    state = {plant: {}}

    _fechPlant({id}){
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        fetch(`${proxyurl}https://trefle.io/api/v1/species/${id}?token=${API_KEY}`)
        .then(res => res.json())
        .then(results => {
            
            const {data} = results
            console.log(data)
            this.setState({plant : data})
        })

    }

    _goBack(){
        window.history.back()
    }

    componentDidMount(){
        console.log(this.props)
        const {plantId} = this.props.match.params
        this._fechPlant({id : plantId})
    }

    render() {
        const {scientific_name, family, author, bibliography, common_name, image_url, year, observations} = this.state.plant
        return (
            <div>             
                <Title>Plant Finder</Title>
                <ButtonBackToHome/>               
                <div className="card">
                    <div className="card-content">
                        <div className="media">
                        <div className="media-content">
                            <p className="title is-2">{family}</p>
                            <p className="subtitle is-4"><i>{scientific_name}</i> {author} {year}</p>
                            <p className="subtitle is-5">Common name: {common_name}</p>
                        </div>
                        </div>
                        <div className="content">
                        <strong>Distribution</strong>: {observations}
                        <br/>
                        <strong>Bibliography</strong>: {bibliography}
                        </div>
                    </div>
                    <div className="card-image">
                        <figure className="image">
                        <img src={image_url} alt="Img. not available"/>
                        </figure>
                    </div>
                </div>
            </div>
        )
    }


}