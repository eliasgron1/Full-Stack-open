import { combineReducers } from 'redux'
import anecdoteReducer from '../reducers/anecdoteReducer'

const rootReducer = combineReducers({
    anecdotes: anecdoteReducer
})

export default rootReducer