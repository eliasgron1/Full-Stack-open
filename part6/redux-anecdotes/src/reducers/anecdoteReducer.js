import { createSlice, current } from '@reduxjs/toolkit';
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

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    upvoteAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      console.log('anecdote to vote and id,', anecdoteToVote, id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
      console.log('updated state', current(state))
      return sortByVotes(state)
    },
    createNewAnecdote(state, action) {
      const newAnecdote = asObject(action.payload.content)
      state.push(newAnecdote)
    }
  }
})

export const { upvoteAnecdote, createNewAnecdote } = anecdotesSlice.actions
export default anecdotesSlice.reducer