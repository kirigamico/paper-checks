import React, { Component } from 'react'
import moment from 'moment'
import numberToWords from 'number-to-words'

import './App.scss'

const DATE_FORMAT = 'MMM D, YYYY'


const TextField = ({label, onChange, id, value}) => (
  <div className="text-field">
    <label className="text-field__label" htmlFor={id}>{label}</label>
    <input className="text-field__input" name={id} type="text" onChange={onChange} value={value} />
  </div>
)

class App extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      date: moment(new Date()).format(DATE_FORMAT),
      amount: '',
    }
  }

  componentDidUpdate() {
    const {name, date} = this.state
    document.title = `${moment(date).format('YYYY-MM-DD')}-${name.toLowerCase().replace(/ /g, '-')}`
  }

  handleNameChange(event) {
    this.setState({name: event.target.value.trim()})
  }

  handleDateChange(event) {
    this.setState({date: event.target.value.trim()})
  }

  handleAmountChange(event) {
    const value = event.target.value.trim().replace(/,/g, '')

    if (value) {
      this.setState({amount: parseFloat(value, 10)})
    } else {
      this.setState({amount: ''})
    }
  }

  render() {
    const {name, date, amount} = this.state
    const dateMoment = moment(date)

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
        <div className="copy-block">
          <h1>Paper Checks</h1>
          <p>Never handwrite a check again.</p>
          <p>Fill in the details, and hit Cmd/Ctrl + P. Works best with Chrome.</p>
        </div>
        <div className="fields-block">
          <TextField label="Name" id="name" onChange={(ev) => this.handleNameChange(ev)} />
          <TextField label="Date" id="date" onChange={(ev) => this.handleDateChange(ev)} value={date} />
          <TextField label="Amount" id="amount" onChange={(ev) => this.handleAmountChange(ev)} />
        </div>

        <div className="check-paper">
          <div className="check-paper__name">{name.toUpperCase()}</div>
          <div className="check-paper__date">{dateMoment.format(DATE_FORMAT).toUpperCase()}</div>
          <div className="check-paper__amount">**{amountDisplay}**</div>
          <div className="check-paper__words">**{amountWords.toUpperCase()}**</div>
        </div>
      </div>
    )
  }
}

export default App;
