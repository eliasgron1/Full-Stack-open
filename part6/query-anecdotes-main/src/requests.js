import axios from 'axios'

const URL = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const response = await axios.get(URL)
    return response.data
}

export const createNew = async (anecdote) => {
    const response = await axios.post(URL, anecdote)
    return response.data
}

export const upvote = async (anecdote) => {
    const response = await axios.put(`${URL}/${anecdote.id}`, anecdote)
    return response.data
}