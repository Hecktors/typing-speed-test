import "./App.css"
import useTypingText from "./hooks/useTypingTest"
import Header from "./components/Header"
import Settings from "./components/Settings"
import ProofedText from "./components/ProofedText"
import TypingTest from "./components/TypingTest"
import Button from "./components/Button"
import Result from "./components/Result"
import contentData from "./data.js"

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

  const {
    title,
    subTitle,
    langText,
    timeText,
    textAreaPlaceholderText,
    startButtonText,
    numOfWordsText,
    numOfErrorsText,
    numOfValidWordsText,
    resultText,
    levels,
  } = contentData[settings.language]

  return (
    <div className="App">
      {/* Counter */}
      <div className="counter">
        {Number(timeLeft).toLocaleString("en-US", {
          minimumIntegerDigits: 3,
          useGrouping: false,
        })}{" "}
        sec
      </div>

      {/* Header */}
      <Header title={title} subTitle={subTitle} />

      <main>
        {/* Settings */}
        <Settings
          settings={settings}
          updateSettings={updateSettings}
          timeText={timeText}
          langText={langText}
        />

        {/* Textarea */}
        <TypingTest
          textAreaRef={textAreaRef}
          isDisabled={!isTestRunning}
          placeholder={textAreaPlaceholderText}
        />

        {/* Proofed Textfield */}
        {hasTextProofed && <ProofedText text={textAreaRef.current.value} errors={spellingErrors} />}

        {/* Start button */}
        <Button text={startButtonText} onClick={startTest} disabled={isTestRunning} />

        {/* Result */}
        {hasResult && (
          <Result
            numWords={numWords}
            numValidWords={numValidWords}
            spellingErrors={spellingErrors}
            errorMsg={errorMsg}
            numOfWordsText={numOfWordsText}
            numOfErrorsText={numOfErrorsText}
            numOfValidWordsText={numOfValidWordsText}
            resultText={resultText}
            levels={levels}
            wpm={wpm}
          />
        )}
        {!hasResult && errorMsg && <p className="error">{errorMsg}</p>}
      </main>
    </div>
  )
}
