const express = require('express')
const app = express()

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]


// /persons
app.get('/api/persons/', (request, response) => {
  console.log("get /api/persons/")
  response.json(persons)
})

app.post('/api/persons/', (request, response) => {
  console.log("post /api/persons/")
  
})


// /persons/:ID
app.get('/api/persons/:id', (request, response) => {
  console.log(`get /api/persons/${request.params.id}`)
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.send(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  id = Number(request.params.id)
  console.log(`delete /api/persons/${id}`)
  persons = persons.filter(person =>
    person.id !== id
  )
  response.status(204).end()
})


// /INFO
app.get('/info', (request, response) => {
  console.log("get /info ")
  const personsCount = persons.length
  const date = new Date()
  response.send(`
    <html>
      <body>
        <p> Phonebook includes data of ${personsCount}. </p>
        <p> ${date} </p>
      </body>
    </html>
  `)
})


// LISTEN
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})