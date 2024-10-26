import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from "./NotificationContext"
import { useContext } from 'react'
import { getAll, upvote } from './requests'
import { useQuery, useMutation, QueryClient, useQueryClient } from '@tanstack/react-query'


const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation({
    mutationFn: upvote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes += 1 })
    dispatch({ type: 'UPVOTE', payload: anecdote.content })
    setTimeout(() => {
      dispatch({ type: 'EMPTY' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>unable to load due to server issue</div>
  }

  console.log('result:', result)
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
