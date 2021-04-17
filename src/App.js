import "./App.css"
import useTypingText from "./hooks/useTypingTest"
import Header from "./components/Header"
import Settings from "./components/Settings"
import ProofedText from "./components/ProofedText"
import TypingTest from "./components/TypingTest"
import Button from "./components/Button"
import Result from "./components/Result"

export default function App() {
  const DEFAULT_LANGUAGE = (navigator.language || navigator.userLanguage).replace("-", "")
  const DEFAULT_TIME = 5

  const {
    settings,
    timeLeft,
    numValidWords,
    errorMsg,
    wpm,
    isTestRunning,
    hasTextProofed,
    hasResult,
    spellingErrors,
    numWords,
    textAreaRef,
    updateSettings,
    startTest,
  } = useTypingText(DEFAULT_LANGUAGE, DEFAULT_TIME)

  return (
    <div className="App">
      <div className="counter">
        {Number(timeLeft).toLocaleString("en-US", {
          minimumIntegerDigits: 3,
          useGrouping: false,
        })}{" "}
        sec
      </div>
      <Header />
      <main>
        <Settings settings={settings} updateSettings={updateSettings} />

        <TypingTest textAreaRef={textAreaRef} isDisabled={!isTestRunning} />

        {hasTextProofed && <ProofedText text={textAreaRef.current.value} errors={spellingErrors} />}

        <Button text="Start" onClick={startTest} disabled={isTestRunning} />

        {hasResult && (
          <Result
            numWords={numWords}
            numValidWords={numValidWords}
            spellingErrors={spellingErrors}
            errorMsg={errorMsg}
            wpm={wpm}
          />
        )}
        {!hasResult && errorMsg && <p className="error">{errorMsg}</p>}
      </main>
    </div>
  )
}
