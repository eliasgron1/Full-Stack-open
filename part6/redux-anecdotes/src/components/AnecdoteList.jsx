import { useDispatch, useSelector } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'


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
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const voteHandler = (anecdote) => {
    dispatch(upvoteAnecdote(anecdote.id))
    dispatch(setNotification(`you liked ${anecdote.content}`, 5000));
  }

  return (
    <ul>
      <h2>Anecdotes</h2>
      <Filter />
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <Anecdote
            anecdote={anecdote}
            voteHandler={() => voteHandler(anecdote)}
          />
        </div>
      )}
    </ul>
  )
}

export default AnecdoteList