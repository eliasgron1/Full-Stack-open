import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import CreateNew from './components/CreateNew'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Menu from './components/Menu'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

const App = () => {
  const [notification, setNotification] = useState('')
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`Added new anecdote: ${anecdote.content}`)
    setTimeout(() => {
      setNotification("")
    }, 5000)
  }

  const anecdoteById = (id) => {
    return anecdotes.find(a => a.id === Number(id))
  }

  const vote = (id) => {
    console.log("id:", id)
    const anecdote = anecdoteById(id)
    console.log(anecdote)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === Number(id) ? voted : a))
  }

  return (
    <Router>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create-new" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} vote={vote} />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
