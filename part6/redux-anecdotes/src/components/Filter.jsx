import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const changeHandler = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div>
      Filter
      <input type="text" onChange={changeHandler} />
    </div>
  )
}

export default Filter