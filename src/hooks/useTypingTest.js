import { useState, useEffect, useRef } from "react"
import checkSpelling from "../services/spellCheckerApi"
import convertTextToWordArray from "../services/convertTextToWordArray"

export default function useTypingText(initLanguage, initTime) {
  const [settings, setSettings] = useState({
    time: initTime,
    language: initLanguage,
  })

  const [timeLeft, setTimeRemaining] = useState(initTime)
  const [spellingErrors, setSpellingErrors] = useState([])
  const [numWords, setNumWords] = useState(0)
  const [isTestRunning, setIsTestRunning] = useState(false)
  const [hasTextProofed, setHasTextProofed] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const textAreaRef = useRef(null)
  const timerRef = useRef(null)

  const numValidWords = numWords - spellingErrors.length > 0 ? numWords - spellingErrors.length : 0
  const wpm = Math.floor((60 / settings.time) * numValidWords)

  useEffect(() => {
    resetTest()
  }, [settings]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isTestRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining((time) => time - 1)
      }, 1000)
    } else if (isTestRunning && timeLeft === 0) {
      stopTest()
    }
  }, [timeLeft, isTestRunning]) // eslint-disable-line react-hooks/exhaustive-deps

  function resetTest() {
    setTimeRemaining(settings.time)
    setNumWords(0)
    setSpellingErrors([])
    setHasTextProofed(false)
    setErrorMsg("")
    textAreaRef.current.value = ""
  }

  function startTest() {
    resetTest()
    setIsTestRunning(true)
    textAreaRef.current.disabled = false
    textAreaRef.current.focus()
  }

  async function stopTest() {
    setIsTestRunning(false)
    setIsLoading(true)
    if (!textAreaRef.current.value) {
      setErrorMsg("No text provided")
      setIsLoading(false)
      return
    }
    const { status, data } = await checkSpelling(textAreaRef.current.value, settings.language)
    setIsLoading(false)
    if (status === 200) {
      if (data.spellingErrorCount) {
        setSpellingErrors(data.elements[0].errors.map((error) => error.word))
      }
      setNumWords(convertTextToWordArray(textAreaRef.current.value).length)
      setHasTextProofed(true)
    } else {
      setErrorMsg("Not available")
    }
  }

  function updateSettings(e) {
    if (isTestRunning) {
      clearTimeout(timerRef.current)
      setIsTestRunning(false)
    }
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  return {
    timeLeft,
    numValidWords,
    numWords,
    wpm,
    errorMsg,
    isTestRunning,
    isLoading,
    hasTextProofed,
    spellingErrors,
    settings,
    textAreaRef,
    updateSettings,
    startTest,
  }
}
