import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const navigate = useNavigate()

  const contentField = useField('text')
  const authorField = useField('text')
  const infoField = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (contentField.value) {
      props.addNew({
        content: contentField.value,
        author: authorField.value,
        info: infoField.value,
        votes: 0,
      })
      navigate('/')
    }
  }

  const resetFields = (event) => {
    event.preventDefault()
    contentField.reset()
    authorField.reset()
    infoField.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...{ value: contentField.value, onChange: contentField.onChange }} />
        </div>
        <div>
          author
          <input {...{ value: authorField.value, onChange: authorField.onChange }} />
        </div>
        <div>
          url for more info
          <input {...{ value: infoField.value, onChange: infoField.onChange }} />
        </div>
        <button>create</button>
        <button onClick={resetFields}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew