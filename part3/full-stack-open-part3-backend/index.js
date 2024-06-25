const dotenv = require('dotenv')
dotenv.config({ path: './variables.env' })

const process = require('process')
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// /PERSONS
app.get('/api/persons/', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.post('/api/persons/', (request, response, next) => {
  const body = request.body
  const person = new Person({
    number: body.number,
    name: body.name
  })

  person.save()
    .then(result => {
      console.log('person saved: ', result.toJSON())
      response.json(result)
    })
    .catch(error => { next(error) })
})


// /PERSONS/:ID
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      }
      else {
        console.log('error')
        response.json(null).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => {
      response.status(200).json(result)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body
  const person = {
    number: body.number,
    name: body.name,
  }
  console.log('id is: ', id)

  Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' })
    .then(person => {
      response.status(200).json(person)
    })
    .catch(error => next(error))
})


// /INFO
app.get('/info', (request, response) => {
  Person.find({})
    .then(result => {
      const date = new Date()
      response.send(`
        <html>
        <body>
        <p> Phonebook includes data of ${result.length}. </p>
        <p> ${date} </p>
        </body>
        </html>
        `)
    })
})


// ERROR HANDLER
const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'bad id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)


// LISTEN
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

