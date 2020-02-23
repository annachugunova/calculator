import React from 'react';
import './App.scss';
import {FormField} from './FormField'
import {SummaryField} from './SummaryField'



export class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      "price": 4100000,
      "initialPayment": 620000,
      "duration": 20,
      "percent": 10.8,
      "total": 0,
      "payment": 0,
    }
  }

  componentDidMount = () => {
    this.calculator()
  }

  calculator = () => {
    var {price, initialPayment, duration, percent} = this.state
    var percentPerMonth = percent / 100 / 12
    var tmp = Math.pow(1 + percentPerMonth, duration * 12)
    var payment = Math.round((price - initialPayment) * percentPerMonth * tmp / (tmp - 1))

    this.setState({total: price - initialPayment, payment: payment})
  }

  onChange = (event) => {
    var value = event.target.value

    if (value.trim() === "") value = 0

    value = parseInt(value)
    if (isNaN(value)) return

    var name = event.target.name
    this.setState({[name]: value}, this.calculator)
  }

  onClick = (event) => {
    var isMore = event.target.value === "more"
    var name = event.target.name
    
    this.setState((state) => {
      var value = state[name]

      switch (name) {
      case "price": 
        value += isMore ? 50000 : -50000
        if (value < state.initialPayment) value = state.initialPayment
        break
      case "initialPayment":
        value += isMore ? 10000 : -10000
        if (value < state.price * 0.2) {
          value = state.price * 0.2 
          break
        }
        if (value > state.price)
          value = state.price
        break
      default: 
        value += isMore ? 1 : -1
        if (value < 1) {
          value = 1
          break
        }
        if (value > 30) value = 30
        break
    }

      return {[name]: value}
    }, this.calculator)
  }

  render () {

    return (
      <div class="container">
      
      <div class="calculator">
        <div id="form">
        
          <h1 class="title">Ипотечный калькулятор</h1>

          <FormField 
            value={this.state.price} 
            name="price"
            title="Стоимость жилья, ₽"
            onChange={this.onChange} 
            onClick={this.onClick}
          />

          <FormField 
            value={this.state.initialPayment} 
            name="initialPayment"
            title="Первоначальный взнос, ₽"
            onChange={this.onChange} 
            onClick={this.onClick}
          />

          <FormField 
            value={this.state.duration} 
            name="duration"
            title="Срок кредитования, лет"
            onChange={this.onChange} 
            onClick={this.onClick}
          />

        </div>

        <div class="description">
          <p>Расчет является предварительным.</p>
          <p>Точные условия по кредиту вам будут предоставлены в отделении банка.</p>
        </div>
      </div>

      <div class="result">
        <div class="result-summary">
          <h2 class="title">Результаты расчета</h2>

          <SummaryField
            label="Сумма кредита"
            value={this.state.total}
          />

          <SummaryField
            label="Ежемесячный платеж"
            value={this.state.payment}
          />

          <SummaryField
            label={`Процентная ставка: ${this.state.percent}%`}
          /> 
            
        </div>       

        <a class="result-link" href="#">Оформить заявку</a>
        
      </div>
    </div>
    );
  }
}
