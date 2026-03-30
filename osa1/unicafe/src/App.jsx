import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const count = good + neutral + bad
  const average = (good - bad) / (good + neutral + bad)

  return (
    <div>
      <Header title="Give feedback" />
      <Buttons good={good} neutral={neutral} bad={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad} />
      <Statistics average={average} count={count} stats={[
        { name: 'Good', value: good },
        { name: 'Neutral', value: neutral },
        { name: 'Bad', value: bad }
      ]} />
    </div>
  )
}

const Header = ({ title }) => {
  return <h1>{title}</h1>
}

const Statistics = ({ average, count, stats }) => {
  if (count === 0) {
    return (<p>No feedback given</p>)
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            {stats.map((stat) => (
              <StatisticsLine key={stat.name} text={stat.name} value={stat.value} />
            ))}
            <StatisticsLine text="All" value={count} />
            <StatisticsLine text="Average" value={average} />
            <StatisticsLine text="Positive" value={(stats[0].value / count * 100).toFixed(2) + ' %'} />
          </tbody>
        </table>
      </div>
    )
  }
}

const StatisticsLine = ({ text, value }) => {
  return (<tr><td>{text}</td><td>{value}</td></tr>)
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Buttons = ({ good, neutral, bad, setGood, setNeutral, setBad }) => {
  return (
    <div>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />
    </div>
  )
}

export default App