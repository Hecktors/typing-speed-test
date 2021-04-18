export default function getTypingLevel(wpm) {
  const levels = [
    { limit: 15, name: 1, icon: "🐌" },
    { limit: 25, name: 2, icon: "🐢" },
    { limit: 35, name: 3, icon: "🌱" },
    { limit: 45, name: 4, icon: "⭐️" },
    { limit: 55, name: 5, icon: "⭐️⭐️" },
    { limit: 65, name: 6, icon: "⭐️⭐️⭐️" },
    { limit: 85, name: 7, icon: "⭐️⭐️⭐️⭐️" },
    { limit: Infinity, level: 8, icon: "⭐️⭐️⭐️⭐️⭐️" },
  ]
  return levels.find((level) => level.limit >= wpm)
}
