import getTypingLevel from "../services/getTypingLevel"

export default function Result({ numWords, numValidWords, spellingErrors, errorMsg, wpm }) {
  return (
    <div className="result-container">
      <h3>Result</h3>
      <p>
        <span className="result-title">Words:</span>
        {numWords}
      </p>
      <p>
        <span className="result-title">Errors:</span>
        {errorMsg ? { errorMsg } : spellingErrors.length}
      </p>
      <p>
        <span className="result-title">Counted Words:</span>
        {numValidWords}
      </p>
      <p className="main-result">
        {wpm} wpm - {getTypingLevel(wpm).toUpperCase()}
      </p>
    </div>
  )
}
