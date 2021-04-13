import { useState, useEffect, useRef } from "react"
import checkSpelling from "../services/spellCheckerApi"
import getWordArray from "../services/getWordArray"

export default function useTypingText(initTestTime, initLanguage) {
  function getSpeedLevel(wpm) {
    let level = ""
    switch (true) {
      case wpm <= 15:
        level = "super slow 🐌"
        break
      case wpm <= 25:
        level = "slow 🐢"
        break
      case wpm <= 35:
        level = "under average 🌱"
        break
      case wpm <= 45:
        level = "average ⭐️"
        break
      case wpm <= 55:
        level = "over average ⭐️⭐️"
        break
      case wpm <= 65:
        level = "fast ⭐️⭐️⭐️"
        break
      case wpm <= 80:
        level = "amazing fast ⭐️⭐️⭐️⭐️"
        break
      case wpm > 80:
        level = "super fast ⭐️⭐️⭐️⭐️⭐️"
        break
      default:
        break
    }
    return level
  }

  const [testTime, setTestTime] = useState(initTestTime)
  const [language, setLanguage] = useState(initLanguage)
  const [timeRemaining, setTimeRemaining] = useState(initTestTime)
  const [spellingErrors, setSpellingErrors] = useState([])
  const [numWords, setNumWords] = useState(0)
  const [apiError, setApiError] = useState(null)
  const [isTestRunning, setIsTestRunning] = useState(false)
  const [hasResult, setHasResult] = useState(false)
  const [hasTextProofed, setHasTextProofed] = useState(false)
  const textAreaRef = useRef(null)
  const timerRef = useRef(null)

  let validNumWords = numWords - spellingErrors.length > 0 ? numWords - spellingErrors.length : 0
  const wmp = Math.floor((60 / testTime) * validNumWords)

  useEffect(() => {
    if (isTestRunning && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining((time) => time - 1)
      }, 1000)
    } else if (isTestRunning && timeRemaining === 0) {
      stopTest()
    }
  }, [timeRemaining, isTestRunning]) // eslint-disable-line react-hooks/exhaustive-deps

  function resetTest() {
    setTimeRemaining(testTime)
    setHasResult(false)
    setNumWords(0)
    setSpellingErrors([])
    setHasTextProofed(false)
    setApiError(null)
    textAreaRef.current.value = ""
  }

  function startTest() {
    resetTest()
    setIsTestRunning(true)
    textAreaRef.current.disabled = false
    textAreaRef.current.focus()
  }

  async function stopTest() {
    clearTimeout(timerRef.current)
    setIsTestRunning(false)
    if (!timeRemaining) {
      if (!textAreaRef.current.value) {
        setApiError("No text provided")
        return
      }
      const { status, data } = await checkSpelling(textAreaRef.current.value, language)
      if (status === 200) {
        if (data.spellingErrorCount) {
          setSpellingErrors(data.elements[0].errors.map((error) => error.word))
        }
        setNumWords(getWordArray(textAreaRef.current.value).length)
        setHasTextProofed(true)
        setHasResult(true)
      } else {
        setApiError(data.message)
        setHasResult(true)
      }
    } else {
      resetTest()
    }
  }

  function updateTestTime(e) {
    setTestTime(Number(e.target.value))
    isTestRunning && stopTest()
  }

  function updateLanguage(e) {
    setLanguage(e.target.value)
    isTestRunning && stopTest()
  }

  return {
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
  }
}
