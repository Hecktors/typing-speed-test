import "./App.css"

import ProofedText from "./components/ProofedText"
import useTypingText from "./hooks/useTypingTest"

export default function App() {
  const DEFAULT_LANGUAGE = (navigator.language || navigator.userLanguage).replace("-", "")
  const DEFAULT_TIME = 60

  const {
    language,
    testTime,
    timeRemaining,
    validNumWords,
    apiError,
    wmp,
    isTestRunning,
    hasTextProofed,
    hasResult,
    spellingErrors,
    numWords,
    textAreaRef,
    updateTestTime,
    updateLanguage,
    startTest,
    getSpeedLevel,
  } = useTypingText(DEFAULT_TIME, DEFAULT_LANGUAGE)

  const languageOptions = {
    enUS: "english",
    frFR: "french",
    esES: "spanish",
    itIT: "italian",
    deDE: "german",
  }

  const timeOptions = [60, 120, 180, 300, 600]

  return (
    <div className="App">
      <header className="header">
        <h1>Typing Speed Test</h1>
        <p>How fast can you type?</p>
      </header>

      <main>
        <p>
          {Object.keys(languageOptions).map((lgCode) => (
            <label key={lgCode}>
              <input
                onChange={updateLanguage}
                type="radio"
                name="language"
                value={lgCode}
                checked={language === lgCode}
              />
              {languageOptions[lgCode]}
            </label>
          ))}
        </p>

        <p>
          {timeOptions.map((sec) => {
            return (
              <label key={sec}>
                <input
                  onChange={updateTestTime}
                  type="radio"
                  name="minute"
                  value={sec}
                  checked={testTime === sec}
                />
                {sec / 60} min{" "}
              </label>
            )
          })}
        </p>

        <div className="textBoxContainer">
          <textarea ref={textAreaRef} disabled={!isTestRunning} />
          <div className="counter">{timeRemaining} sec</div>
        </div>

        {hasTextProofed && <ProofedText text={textAreaRef.current.value} errors={spellingErrors} />}

        <button onClick={startTest} disabled={isTestRunning}>
          Start
        </button>

        {hasResult && (
          <div className="result-container">
            <h3>Result</h3>
            <p>
              <span className="result-title">Words:</span>
              {numWords}
            </p>
            <p>
              <span className="result-title">Errors:</span>
              {apiError ? "Not available" : spellingErrors.length}
            </p>
            <p>
              <span className="result-title">Counted Words:</span>
              {validNumWords}
            </p>
            <p className="main-result">
              {wmp}wpm - {getSpeedLevel(wmp).toUpperCase()}
            </p>
          </div>
        )}
        {!hasResult && apiError && <p className="error">{apiError}</p>}
      </main>
    </div>
  )
}
