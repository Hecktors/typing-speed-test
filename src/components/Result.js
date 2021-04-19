import getTypingLevel from "../services/getTypingLevel"

export default function Result({
  isLoading,
  numOfWordsText,
  numWords,
  spellingErrors,
  numOfErrorsText,
  numOfValidWordsText,
  numValidWords,
  resultText,
  errorMsg,
  wpm,
  levels,
}) {
  return (
    <div className="result-container">
      <h3>{resultText}</h3>
      <p>
        <span className="result-title">{numOfWordsText}:</span>
        {!isLoading && numWords}
      </p>
      <p>
        <span className="result-title">{numOfErrorsText}:</span>
        {errorMsg ? { errorMsg } : !isLoading && spellingErrors.length}
      </p>
      <p>
        <span className="result-title">{numOfValidWordsText}:</span>
        {!isLoading && numValidWords}
      </p>
      <p className="main-result">
        <b>{!isLoading && wpm}wpm</b> - {!isLoading && levels[getTypingLevel(wpm)]}
      </p>
    </div>
  )
}
