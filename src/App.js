import { useState } from "react"
import "./App.css"

export default function App() {
  const DEFAULT_TIME = 5

  const [text, setText] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_TIME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)

  return (
    <div className="App">
      <header className="header">
        <h1>Typing Speed Test</h1>
        <p>How fast can you type?</p>
      </header>
      <main>
        <div className="textBoxContainer">
          <textarea rows="10" cols="50" />
          <div className="counter">{timeRemaining}</div>
        </div>
        <button>Start</button>
        <p>Word count: 0</p>
      </main>
    </div>
  )
}
