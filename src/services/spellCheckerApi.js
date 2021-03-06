import axios from "axios"

export default function spellCheckerApi(text, language) {
  const options = {
    method: "POST",
    url: "https://jspell-checker.p.rapidapi.com/check",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
      "x-rapidapi-host": "jspell-checker.p.rapidapi.com",
    },
    data: {
      language: language,
      fieldvalues: text,
      config: {
        forceUpperCase: false,
        ignoreIrregularCaps: false,
        ignoreFirstCaps: true,
        ignoreNumbers: true,
        ignoreUpper: true,
        ignoreDouble: false,
        ignoreWordsWithNumbers: true,
      },
    },
  }

  return axios
    .request(options)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response
    })
}
