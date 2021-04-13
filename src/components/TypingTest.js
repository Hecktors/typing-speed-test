export default function TypingTest({ textAreaRef, isDisabled, num }) {
  return (
    <div className="TypingTest">
      <textarea ref={textAreaRef} disabled={isDisabled} />
      <div className="counter">{num} sec</div>
    </div>
  )
}
