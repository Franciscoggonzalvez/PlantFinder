import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Plant} from './Plant.js'

export class PlantList extends Component{

    static propTypes = {
        plants: PropTypes.array
    }

    render(){
        const {plants} = this.props
        return (
            <div>
            <h4 class="subtitle is-6 mt-2">Find more information by clicking on the image</h4>
            {plants.length === 1
            ? <div className = 'SinglePlant'>
                        <div key={plants[0].id} className='PlantList-item'>
                            < Plant  
                            id = {plants[0].id}
                            scientific_name={plants[0].scientific_name}
                            image_url = {plants[0].image_url}
                            />
                        </div>              
             </div>
            : <div className = 'PlantList'>
                {
                    plants.map(planta =>{
                        return (
                        <div key={planta.id} className='PlantList-item'>
                            < Plant  
                            id = {planta.id}
                            scientific_name={planta.scientific_name}
                            image_url = {planta.image_url}
                            />
                        </div>
                        )
                    })
                }
            </div>
    }
        </div>
        )
    }   
}