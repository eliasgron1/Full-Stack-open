import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes, vote }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(anecdote => anecdote.id == Number(id))
  return (
    <div>
      <h2>
        {anecdote.content}
      </h2>
      <p>
        by {anecdote.author}
      </p>
      <div>
        <strong>
          votes: {anecdote.votes}
        </strong>
        <button onClick={() => vote(id)}>upvote</button>
      </div>
    </div>
  )
}

export default Anecdote