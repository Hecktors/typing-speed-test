import { useState, useEffect, useRef } from "react"
import "./App.css"
import checkSpelling from "./services/spellCheckerApi"
import ProofedText from "./ProofedText"
import getWordArray from "./services/getWordArray"

export default function App() {
  const DEFAULT_TIME = 5

  const [isResultDisplay, setIsResultDisplay] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_TIME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [error, setError] = useState(null)
  const [numWords, setNumWord] = useState(0)
  const [spellingErrors, setSpellingErrors] = useState([])
  const [hasTextProofed, setHasTextProofed] = useState(false)
  const textAreaRef = useRef(null)

  const style = { display: isResultDisplay ? "block" : "none" }

  function startTest() {
    setIsResultDisplay(false)
    setTimeRemaining(DEFAULT_TIME)
    setIsTimeRunning(true)
    setNumWord(0)
    setSpellingErrors([])
    setHasTextProofed(false)
    textAreaRef.current.value = ""
    textAreaRef.current.disabled = false
    textAreaRef.current.focus()
  }

  async function stopTest() {
    setIsTimeRunning(false)
    const response = await checkSpelling(textAreaRef.current.value)
    if (response.status === 200) {
      setSpellingErrors(response.data.elements[0].errors.map((error) => error.word))
      setNumWord(getWordArray(textAreaRef.current.value).length)
      setHasTextProofed(true)
      setIsResultDisplay(true)
    } else {
      setError(response.data.message)
      setIsResultDisplay(true)
    }
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1)
      }, 1000)
    } else if (isTimeRunning && timeRemaining === 0) {
      stopTest()
    }
  }, [timeRemaining, isTimeRunning]) // eslint-disable-line react-hooks/exhaustive-deps

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
        {hasTextProofed && <ProofedText text={textAreaRef.current.value} errors={spellingErrors} />}
        <button onClick={startTest} disabled={isTimeRunning}>
          Start
        </button>
        <p style={style}>Word count: {numWords}</p>
        <p style={style} className="display-linebreak">
          Spelling Errors: {!error && spellingErrors.length}
          {error && <span className="error">Not available</span>}
        </p>

        <p style={style}>Result: {numWords - spellingErrors.length}</p>
      </main>
    </div>
  )
}
