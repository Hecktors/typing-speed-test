export default function getTypingLevel(wpm) {
  wpm = 100
  const levels = [
    { limit: 15, name: 1 },
    { limit: 25, name: 2 },
    { limit: 35, name: 3 },
    { limit: 45, name: 4 },
    { limit: 55, name: 5 },
    { limit: 65, name: 6 },
    { limit: 85, name: 7 },
    { limit: Infinity, name: 8 },
  ]
  console.log(
    "level",
    levels.find((level) => level.limit >= wpm)
  )
  return levels.find((level) => level.limit >= wpm).name
}
