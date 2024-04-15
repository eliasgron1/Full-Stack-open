import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good_count, setGood] = useState(0)
  const [neutral_count, setNeutral] = useState(0)
  const [bad_count, setBad] = useState(0)


  const increaseGood = () => {
    console.log("good pressed, count:", good_count)
    const new_good_count = good_count + 1
    setGood(new_good_count)
  }

  const increaseNeutral = () => {
    console.log("neutral pressed, count:", neutral_count)
    const new_neutral_count = neutral_count + 1
    setNeutral(new_neutral_count)
  }

  const increaseBad = () => {
    console.log("bad pressed, count:", bad_count)
    const new_bad_count = bad_count + 1
    setBad(new_bad_count)
  }

  return (
    <div>
      <h1>
        Give Feedback
      </h1>
      <Button onClick={increaseGood} text="good"/>
      <Button onClick={increaseNeutral} text="neutral"/>
      <Button onClick={increaseBad} text="bad"/>
      <h1>
        Statistics
      </h1>
      <Statistics good_count={good_count} neutral_count={neutral_count}bad_count={bad_count}/>
    </div>
  )
}


const calculateAverage = (good, neutral, bad) => {
  const sum = good + bad + neutral
  const average = (good - bad) / sum 
  return average
}

const calcPosPercentage = (good, neutral, bad) => {
  const sum = good+neutral+bad
  const pos_percent = (good / sum) * 100
  return pos_percent + "%" 
}


const Button = (props) => {
  return(
    <div>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  )
}


const Statistics = (props) => {
  const {good_count, neutral_count, bad_count} = props
  
  if(good_count + neutral_count + bad_count != 0){
    return(
      <div>
        <StatisticsLine count={good_count} text="good"/>
        <StatisticsLine count={neutral_count} text="neutral"/>
        <StatisticsLine count={bad_count} text="bad"/>
        <StatisticsLine count={good_count+neutral_count+bad_count} text="total"/>
        <StatisticsLine count={calculateAverage(good_count, neutral_count, bad_count)} text="average feedback"/>
        <StatisticsLine count={calcPosPercentage(good_count, neutral_count, bad_count)} text="positive feedback"/>
      </div>
    )
  }
  else{
    return(
      <div>
        <p>
          No statistics yet
        </p>
      </div>
    )
  }
}


const StatisticsLine = (props) => {
  return(
    <div>
      <p>
        {props.text} {props.count}
      </p>
    </div>
  )
}



export default App