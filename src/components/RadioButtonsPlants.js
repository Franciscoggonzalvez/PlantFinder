import React, {Component} from 'react'

export class RadioButtonPlants extends Component {

    state = {
        selectedOption: ''
    }

    handleOptionChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        }, () => {this.sendRadioValues()})
      }

    sendRadioValues = () => {
        const {selectedOption} = this.state;
        console.log('Opcion selecionada' + selectedOption)
        this.props.onResults(selectedOption)
    }
    render(){
        return(
            
            <div className="control">
                <label className="radio">
                    <input 
                    type="radio" 
                    name="rsvp" 
                    value ='genus_name'
                    onChange={this.handleOptionChange}
                    />
                    Genus
                </label>
                <label className="radio">
                    <input 
                    type="radio" 
                    name="rsvp" 
                    value='scientific_name'
                    onChange={this.handleOptionChange}
                    />
                    Species
                </label>
                <label className="radio">
                    <input 
                    type="radio" 
                    name="rsvp" 
                    value='common_name'
                    onChange={this.handleOptionChange}
                    />
                    Common name
                </label>
            </div>
            
        )
    }
}