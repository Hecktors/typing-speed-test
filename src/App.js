import { useState, useEffect, useRef } from "react"
import "./App.css"

export default function App() {
  const DEFAULT_TIME = 5

  const [isFirstRender, setIsFirstRender] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_TIME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [numWords, setNumWord] = useState(0)
  const textAreaRef = useRef(null)

  function countWords(text) {
    const words = text.trim().split(" ")
    return words.filter((word) => word !== "").length
  }

  function startTimer() {
    setIsTimeRunning(true)
    setNumWord(0)
    textAreaRef.current.value = ""
    textAreaRef.current.disabled = false
    textAreaRef.current.focus()
  }

  function stopTimer() {
    setTimeRemaining(DEFAULT_TIME)
    setIsTimeRunning(false)
    setNumWord(countWords(textAreaRef.current.value))
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setIsFirstRender(false)
      setTimeout(() => {
        setTimeRemaining((time) => time - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      stopTimer()
    }
  }, [timeRemaining, isTimeRunning])

  return (
    <div className="App">
      <header className="header">
        <h1>Typing Speed Test</h1>
        <p>How fast can you type?</p>
      </header>
      <main>
        <div className="textBoxContainer">
          <textarea ref={textAreaRef} disabled={!isTimeRunning} />
          <div className="counter">{timeRemaining}</div>
        </div>
        <button onClick={startTimer} disabled={isTimeRunning}>
          Start
        </button>
        <p>{!isFirstRender && !isTimeRunning ? "Word count: " + numWords : ""}</p>
      </main>
    </div>
  )
}
