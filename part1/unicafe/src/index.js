import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, bad, neutral }) => {

  const totalVotes = good + neutral + bad
  const average = (good - bad) / totalVotes

  if (totalVotes === 0) {
    return <p>No feedback given</p>
  }
  else {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={totalVotes} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={good * 100 / totalVotes + ' %'} />
        </tbody>
      </table>
    )
  }
}



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addOneToGood = () => setGood(good + 1)

  const addOneToNeutral = () => setNeutral(neutral + 1)

  const addOneToBad = () => setBad(bad + 1)

  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={addOneToGood} text="good" />
      <Button handleClick={addOneToNeutral} text="neutral" />
      <Button handleClick={addOneToBad} text="bad" />

      <Title text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)