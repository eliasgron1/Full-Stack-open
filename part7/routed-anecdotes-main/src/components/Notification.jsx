const Notification = ({ notification }) => {

  const style = {
    border: '2px solid black'
  }


  if (notification)
    return (
      <div style={style}>
        {notification}
      </div>
    )

  else {
    return (
      <div>

      </div>
    )
  }
}

export default Notification