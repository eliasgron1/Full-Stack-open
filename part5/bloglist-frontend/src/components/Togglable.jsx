import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'


const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const changeVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      changeVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={changeVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {children}
        <button onClick={changeVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable