const getId = () => (100000 * Math.random()).toFixed(0)

const sortByVotes = (anecdotes) => anecdotes.sort((a, b) => b.votes - a.votes)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export { getId, sortByVotes, asObject }