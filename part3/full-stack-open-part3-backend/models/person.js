const process = require('process')
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to: ', url)

mongoose.connect(url)
  .then(result => {
    console.log('connection succesful: ', result.connections)
  })
  .catch(error => {
    console.log('connection failed', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return (/^\d{2,3}-\d{7,8}$/.test(v)) //not working as intended, fix!
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'number is required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)