import { useDispatch, useSelector } from 'react-redux'
import { incrementVoteOf } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, voteHandler }) => {
  return (
    <li>
      <p>
        {anecdote.content}
      </p>
      <strong>{anecdote.votes} votes</strong>
      < button onClick={voteHandler}>vote</button>
    </li>
  )
}


const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  return (
    <ul>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <Anecdote
            anecdote={anecdote}
            voteHandler={() => dispatch(incrementVoteOf(anecdote.id))}
          />
        </div>
      )}
    </ul>
  )
}

export default AnecdoteList