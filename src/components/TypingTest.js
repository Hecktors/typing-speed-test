export default function TypingTest({ textAreaRef, isDisabled, placeholder }) {
  return (
    <div className="TypingTest">
      <textarea ref={textAreaRef} disabled={isDisabled} placeholder={placeholder} />
    </div>
  )
}
