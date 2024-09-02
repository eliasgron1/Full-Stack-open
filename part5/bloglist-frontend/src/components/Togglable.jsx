import { useState, forwardRef, useImperativeHandle } from 'react'

// comment something smart here
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
      <div style={showWhenVisible}>
        {children}
        <button onClick={changeVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable