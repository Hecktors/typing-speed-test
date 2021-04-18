export default function Settings({ settings, updateSettings, langText, timeText }) {
  const languageOptions = ["enUS", "frFR", "esES", "itIT", "deDE"]
  const timeOptions = [60, 120, 180, 300, 600]

  const languageList = (
    <ul>
      {languageOptions.map((lgCode) => (
        <li key={lgCode}>
          <input
            onChange={(e) => updateSettings(e)}
            type="radio"
            name="language"
            id={lgCode}
            value={lgCode}
            checked={settings.language === lgCode}
          />
          <label htmlFor={lgCode}>{lgCode.slice(0, 2)}</label>
        </li>
      ))}
    </ul>
  )

  const timeList = (
    <ul>
      {timeOptions.map((sec) => {
        return (
          <li key={sec}>
            <input
              onChange={(e) => updateSettings(e)}
              type="radio"
              name="time"
              id={sec}
              value={sec}
              checked={Number(settings.time) === sec}
            />
            <label htmlFor={sec}>{sec / 60}min</label>
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className="Settings">
      <div>
        {langText}:{languageList}
      </div>
      <div>
        {timeText}: {timeList}
      </div>
    </div>
  )
}
