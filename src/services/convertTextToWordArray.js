export default function convertTextToWordArray(text) {
  const words = text.trim().split(" ")
  return words.filter((word) => /[a-zA-Z]/.test(word))
}
