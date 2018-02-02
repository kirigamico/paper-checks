import React, { Component } from 'react'
import numberToWords from 'number-to-words'

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
    this.setState({name: event.target.value.trim()})
  }

  handleDateChange(event) {
    this.setState({date: event.target.value.trim()})
  }

  handleAmountChange(event) {
    this.setState({amount: parseFloat(event.target.value, 10)})
  }

  render() {
    const {name, date, amount} = this.state

    const amountDisplay = amount.toLocaleString(
      ['en-ph'], {
      style: 'decimal',
      minimumFractionDigits: 2,
    });

    let amountWords = ''

    if (amount) {
      amountWords = numberToWords.toWords(amount);

      if (amount % 1) {
        const decimal = (amount % 1 * 100).toFixed(0);
        amountWords = `${amountWords} and ${decimal}/100`
      }
    }

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
          <div className="check-paper__amount">**{amountDisplay}**</div>
          <div className="check-paper__words">**{amountWords.toUpperCase()}**</div>
        </div>
      </div>
    )
  }
}

export default App;
