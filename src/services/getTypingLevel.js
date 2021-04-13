export default function getTypingLevel(wpm) {
  const levels = [
    { limit: 15, msg: "super slow 🐌" },
    { limit: 25, msg: "slow 🐢" },
    { limit: 35, msg: "under average 🌱" },
    { limit: 45, msg: "average ⭐️" },
    { limit: 55, msg: "over average ⭐️⭐️" },
    { limit: 65, msg: "fast ⭐️⭐️⭐️" },
    { limit: 85, msg: "amazing fast ⭐️⭐️⭐️⭐️" },
    { limit: Infinity, msg: "super fast ⭐️⭐️⭐️⭐️⭐️" },
  ]
  return levels.find((level) => level.limit >= wpm).msg
}
