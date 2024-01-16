//import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import counterReducer from './reducers/counterReducer'
import { createStore } from 'redux'

//This object carries the state
const store = createStore(counterReducer)

//Button component
const Button = ({eventHandler,text}) =>
  <button onClick={eventHandler}>{text}</button>

//StatisticLine component
const  StatisticLine = ({text,value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

//Statistics component
const Statistics = ({good,neutral,bad}) => {

  const total = good+bad+neutral

  const average = () =>{ 
    if (total === 0)
      return 0
    return (good - bad)/total
  }

  const positivePercentage = () => {
    if (total === 0)
      return 0
    return good*100/total
  }

  //Still no feedback
  if (total === 0){
    return(
      <>
      <h1>Statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }

  return(
    <>
    <h1>Statistics</h1>
      <table>
        <tbody>
        <StatisticLine text={'Good'} value={good} />
        <StatisticLine text={'Neutral'} value={neutral} />
        <StatisticLine text={'Bad'} value={bad} />
        <StatisticLine text={'All'} value={total} />
        <StatisticLine text={'Average'} value={average()} />
        <StatisticLine text={'Positive'} value={positivePercentage()+' %'} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
    const giveGoodFeedback = () => { store.dispatch({type: 'GOOD'}) }
    const giveNeutralFeedback = () => { store.dispatch({type: 'OK'}) }
    const giveBadFeedback = () => { store.dispatch({type: 'BAD'}) }
    const reset = () => { store.dispatch({type: 'ZERO'}) }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button eventHandler={giveGoodFeedback} text={'good'} />
      <Button eventHandler={giveNeutralFeedback} text={'neutral'} />
      <Button eventHandler={giveBadFeedback} text={'bad'} />
      <Button eventHandler={reset} text={'reset stats'} />
      <Statistics good={store.getState().good}
        neutral={store.getState().ok}
        bad={store.getState().bad}/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)