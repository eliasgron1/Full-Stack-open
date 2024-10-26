import axios from 'axios';

const URL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(URL)
  return response.data
}

const create = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(URL, object)
  return response.data
}

const upvote = async (anecdote, id) => {
  const response = await axios.put(`${URL}/${id}`, anecdote)
  return response.data
}

export default { getAll, create, upvote }
