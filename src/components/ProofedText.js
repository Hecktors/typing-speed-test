import convertTextToWordArray from "../services/convertTextToWordArray"

export default function ProofreadedText({ text, errors }) {
  const words = convertTextToWordArray(text)
  const proofedWords = words.map((word, index) => {
    return (
      <span key={index} className={errors.includes(word) ? "error" : "correct"}>
        {word}{" "}
      </span>
    )
  })
  return <div className="ProofedText">{proofedWords}</div>
}
