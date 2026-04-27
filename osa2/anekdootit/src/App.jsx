import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [anecdoteVotes, setAnecdoteVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)
  const [selected, setSelected] = useState(0)

  function votingHandler(selected) {
    const copy = [...anecdoteVotes]
    copy[selected] += 1
    setAnecdoteVotes(copy)
    console.log(copy)

    if (copy[selected] >= copy[mostVotes]) {
      setMostVotes(selected)
    }

  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <button onClick={() => votingHandler(selected)}>Vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>Next anecdote</button>
      <p>
        {anecdotes[selected]}
      </p>
      <h1>Anecdote with most votes</h1>
      <p>
        {anecdotes[mostVotes]}
      </p>
      <p>has {anecdoteVotes[mostVotes]} votes</p>
    </div>
  )


}

export default App