import { sortByVotes, asObject } from '../util/anecdoteUtil'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const initialState = sortByVotes(anecdotesAtStart.map(asObject))

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action.type)
  console.log('payload:', action.payload)

  switch (action.type) {
    case 'UPVOTE': {
      const id = action.payload.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const upVotedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      const updatedState = state.map(anecdote => anecdote.id === id ? upVotedAnecdote : anecdote)
      console.log('updated anecdote', upVotedAnecdote)
      return sortByVotes(updatedState)
    }
    case 'NEW_ANECDOTE': {
      const newAnecdote = asObject(action.payload.content)
      const updatedState = [...state, newAnecdote]
      console.log('updatedState', updatedState)
      return sortByVotes(updatedState)
    }

    default:
      return state
  }
}

export const incrementVoteOf = (id) => {
  return {
    type: 'UPVOTE',
    payload: {
      id
    }
  }
}
export const createNewAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content
    }
  }
}


export default reducer