import getTypingLevel from "../services/getTypingLevel"

export default function Result({
  numWords,
  numValidWords,
  spellingErrors,
  errorMsg,
  numOfWordsText,
  numOfErrorsText,
  numOfValidWordsText,
  resultText,
  levels,
  wpm,
}) {
  const typingLevel = getTypingLevel(wpm)
  return (
    <div className="result-container">
      <p>
        <span className="result-title">{numOfWordsText}:</span>
        {numWords}
      </p>
      <p>
        <span className="result-title">{numOfErrorsText}:</span>
        {errorMsg ? { errorMsg } : spellingErrors.length}
      </p>
      <p>
        <span className="result-title">{numOfValidWordsText}:</span>
        {numValidWords}
      </p>
      <p className="main-result">
        {resultText}: <b>{wpm}wpm</b> - {levels[typingLevel.name]} {typingLevel.icon}
      </p>
    </div>
  )
}
