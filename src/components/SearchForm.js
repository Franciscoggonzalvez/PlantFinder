import React, {Component} from 'react'
import {RadioButtonPlants} from './RadioButtonsPlants.js'

const API_KEY = 'rmT15QniWjW_VZOh6PoGm1_xeYQ8jpdNifiAfZoVvBk'
const INITIAL_STATE = {
    inputPlant: '',
    page: 1,
    totalPlants: 0.1,
    initialPage: true,
    finalPage: false,
    showButtons: false,
    radioValue: ''
}

export class SearchForm extends Component {

    state = INITIAL_STATE

    _handleChange = (e) =>{
        this.setState({inputPlant : e.target.value,
        page: 1, totalPlants: 0.1})
    }

    _handleNextPage = () =>{
        const {page} = this.state
        console.log('nextPageAnets '+ page)
        this.setState({page: page + 1})
        console.log('nextPageDes'+ page)
    }

    _handlePreviousPage = () => {
        const {page} = this.state
        this.setState({page : page - 1})
    }

    _handleFirstPage = () => {
        this.setState({page: 1})
    }

    _handleLastPage = () => {
        const {totalPlants} = this.state
        this.setState({page : Math.ceil((totalPlants)/20)})
    }

    _handlePages () {
        const {totalPlants, page} = this.state
        if (page >= Math.ceil((totalPlants)/20)) {
            this.setState({finalPage : true})}
        else {this.setState({finalPage: false})}
        if (page === 1) {
            this.setState({initialPage : true})
        }
        else {
            this.setState({initialPage: false})
        }

    }


    _handleSubmit = (e) =>{
        e.preventDefault()

        const {inputPlant, page, radioValue} = this.state
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        if(radioValue ==='') { return}
        if(inputPlant==='') { return}

        fetch(`${proxyurl}https://trefle.io/api/v1/plants?token=${API_KEY}&page=${page}&filter[${radioValue}]=${inputPlant}`)
        .then(res => res.json())
        .then(results => {       
            console.log(results)
            const {data = [], meta = 0} = results
            this.props.onResults(data)
            this.setState({totalPlants: meta.total})
            if (meta.total > 0) {
                this.setState( {showButtons: true})
            }
            else{
                this.setState({showButtons: false})
            }
            this._handlePages()          
        })     
    }

    _handleRadioButtons = (radioValue) =>{
        this.setState({radioValue})
        console.log('handleRadioButtons' + radioValue)
        }


    render() {
        const {initialPage, finalPage, showButtons, radioValue} = this.state
        return(
            <div className='ContainerSearchForm'>
                <div className='InformacionHome' >
                 {radioValue===''
                ? <h4 className="subtitle is-4 has-text-info">Please, check an option</h4>
                : <h4 className="subtitle is-4 has-text-info">Please, write your search</h4>
                    }
                </div>
                <div className='RadioButtons'>
                    <RadioButtonPlants onResults={this._handleRadioButtons}/>
                </div>
                <form onSubmit={this._handleSubmit}>
                    <div className="field has-addons">
                        <div className="control">
                            <input 
                            className="input" 
                            onChange={this._handleChange}
                            type="text" 
                            placeholder="Find plants"/>
                        </div>
                        <div className="control">
                            <button className="button is-info">
                            Search
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        {showButtons
                        ? <div className='field is-grouped mt-6'>
                            <p className='control'>
                            <button 
                            className='button is-info is-small' 
                            onClick={this._handleFirstPage} 
                            disabled = {initialPage}>First</button>
                            </p>
                            <p className='control'>
                            <button 
                            className='button is-info is-small ml-4' 
                            onClick={this._handlePreviousPage} 
                            disabled = {initialPage}>Prev</button>
                            </p>
                            <p className='control'>
                            <button 
                            className='button is-info is-small ml-4' 
                            onClick={this._handleNextPage} 
                            disabled={finalPage}>Next</button>       
                            </p>
                            <p className='control'>
                            <button 
                            className='button is-info is-small ml-4' 
                            onClick={this._handleLastPage} 
                            disabled = {finalPage}>Last</button>
                            </p>
                        </div>
                        : null
                        }
                    </div>
                </form>
        </div>
        )
    }
}