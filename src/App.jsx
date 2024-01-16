import { useState } from 'react'

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
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGoodFeedback = () => {
    setGood(good+1)
  }

  const giveNeutralFeedback = () => {
    setNeutral(neutral+1)
  }

  const giveBadFeedback = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button eventHandler={giveGoodFeedback} text={'good'} />
      <Button eventHandler={giveNeutralFeedback} text={'neutral'} />
      <Button eventHandler={giveBadFeedback} text={'bad'} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App