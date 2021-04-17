export default function TypingTest({ textAreaRef, isDisabled }) {
  return (
    <div className="TypingTest">
      <textarea
        ref={textAreaRef}
        disabled={isDisabled}
        placeholder="Type after starting the test"
      />
    </div>
  )
}
