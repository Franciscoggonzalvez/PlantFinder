import React, { Component } from 'react';
import {Title} from '../components/Title.js'
import {SearchForm} from '../components/SearchForm.js'
import {PlantList} from '../components/PlantLists.js'


export class Home extends Component{

    state = {results: [], usedSearch: false
    }

    _handleResults = (results) =>{
    this.setState({results: results, usedSearch: true})
    }

    _handleRadioButtons = (radioButtonsValue) =>{
        this.setState({radioButtonsValue: radioButtonsValue})
        console.log('handleRadioButtons' + radioButtonsValue)
        }


    _renderResults() {
    return this.state.results.length === 0
    ? <p>Sorry, no results were found</p>
    : <PlantList plants = {this.state.results}/>
    }

    render() {
        const{results, usedSearch}=this.state
        var classes = ''
        if (results.length === 0 && !usedSearch) {classes = 'ContainerHome'}
        else {classes = 'ContainerResults'}
        return (
            <div className= {classes}>
                <Title>Plant Finder</Title>
                <h4 className="subtitle is-6 is-italic has-text-weight-light">Francisco G. Gonzálvez</h4>
                    <div className='SearchForm-Wrapper'>
                    <SearchForm onResults={this._handleResults}/>
                    </div>
                    {usedSearch
                    ? this._renderResults()
                    : null
                    }                        
            </div>
            
        )
    }
}