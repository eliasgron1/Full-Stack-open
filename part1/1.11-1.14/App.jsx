import { useState } from 'react'

const App = () => {    
    const anecdotes = [
      'If it hurts, do it more often.',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      'The only way to go fast, is to go well.'
    ]     
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0,})
    const votes_copy = {...votes}

    
    const nextAnecdote = () => {
      let new_index = getRandomNum()
      console.log("current index", selected)

      while(new_index == selected){
        new_index = getRandomNum()
        console.log(new_index)
      }
      
      console.log("now set to", new_index)
      setSelected(new_index)
    }

    const voteAnecdote = () => {
      votes_copy[selected] += 1
      setVotes(votes_copy)
      console.log("votes for",selected,": ", votes_copy[selected])
    }

    const getTopVotedKey = () => {
      let top_voted_key = 0
      for(let key in votes){
        if(votes[key] > votes[top_voted_key]){
          console.log(key, "is bigger than", top_voted_key)
          top_voted_key = key
        }
      }
      return top_voted_key
    } 
    

    return (
      <div>
          <h1>
            Anecdote of the day
          </h1>
          {anecdotes[selected]}
          <p>
            has {votes_copy[selected]} votes
          </p>
        <div>
          <Button onClick={nextAnecdote} text="next"/>
          <Button onClick={voteAnecdote} text="vote"/>
        </div>
        <h1>
          Anecdote with most votes
        </h1>
        <p>
          {anecdotes[getTopVotedKey()]}
        </p>
      </div>
    )
}

const getRandomNum = () => {
  return Math.floor(Math.random() * 8);
} 

const Button = (props) => {
    return(
        <button onClick={props.onClick}>
          {props.text}
        </button>
    )
  }

export default App