import getWordArray from "../services/getWordArray"

export default function ProofreadedText({ text, errors }) {
  const words = getWordArray(text)
  const proofedWords = words.map((word, index) => {
    return (
      <span key={index} className={errors.includes(word) ? "error" : "correct"}>
        {word}{" "}
      </span>
    )
  })
  return <div>{proofedWords}</div>
}
