import { createSlice } from '@reduxjs/toolkit';
import { sortByVotes } from '../util/anecdoteUtil'
import anecdoteService from '../services/anecdoteService'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      const anecdoteExist = state.find(anecdote =>
        anecdote.id === action.payload.id
      )
      if (anecdoteExist) {
        const anecdotes = state.map(anecdote =>
          anecdote.id == action.payload.id ? action.payload : anecdote
        )
        return sortByVotes(anecdotes)
      }
      else {
        const newState = [...state, action.payload]
        return sortByVotes(newState)
      }
    },
    setAnecdotes(state, action) {
      return sortByVotes(action.payload)
    }
  }
})

export const { appendAnecdote, setAnecdotes } = anecdotesSlice.actions

export const upvoteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const anecdoteToVote = state.anecdotes.find(anecdote => anecdote.id === id)
    console.log('upvoting:', anecdoteToVote)
    const updatedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }

    const response = await anecdoteService.upvote(updatedAnecdote, id)
    dispatch(appendAnecdote(response))
  }
}

export const initializeAnecdotes = () => {
  console.log('initialising anecdotes')
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const response = await anecdoteService.create(content)
    console.log(response)
    dispatch(appendAnecdote(response))
  }
}

export default anecdotesSlice.reducer