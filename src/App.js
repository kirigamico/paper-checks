import React, { Component } from 'react'
import './App.scss'

const TextField = ({label, onChange, id}) => (
  <div className="text-field">
    <label className="text-field__label" htmlFor={id}>{label}</label>
    <input className="text-field__input" name={id} type="text" onChange={onChange} />
  </div>
)

class App extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      date: '',
      amount: '',
    }
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  handleDateChange(event) {
    this.setState({date: event.target.value})
  }

  handleAmountChange(event) {
    this.setState({amount: event.target.value})
  }

  render() {
    const {name, date, amount} = this.state

    return (
      <div className="app-block">
        <div className="fields-block">
          <TextField label="Name" id="name" onChange={(ev) => this.handleNameChange(ev)} />
          <TextField label="Date" id="date" onChange={(ev) => this.handleDateChange(ev)} />
          <TextField label="Amount" id="amount" onChange={(ev) => this.handleAmountChange(ev)} />
        </div>

        <div className="check-paper">
          <div className="check-paper__name">{name.toUpperCase()}</div>
          <div className="check-paper__date">{date.toUpperCase()}</div>
          <div className="check-paper__amount">{amount}</div>
        </div>
      </div>
    )
  }
}

export default App;
