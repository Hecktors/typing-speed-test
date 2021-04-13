export default function Settings({ settings, updateSettings }) {
  const languageOptions = {
    enUS: "english",
    frFR: "french",
    esES: "spanish",
    itIT: "italian",
    deDE: "german",
  }
  const timeOptions = [60, 120, 180, 300, 600]

  return (
    <div>
      <p>
        {Object.keys(languageOptions).map((lgCode) => (
          <label key={lgCode}>
            <input
              onChange={(e) => updateSettings(e)}
              type="radio"
              name="language"
              value={lgCode}
              checked={settings.language === lgCode}
            />
            {languageOptions[lgCode]}
          </label>
        ))}
      </p>

      <p>
        {timeOptions.map((sec) => {
          return (
            <label key={sec}>
              <input
                onChange={(e) => updateSettings(e)}
                type="radio"
                name="time"
                value={sec}
                checked={Number(settings.time) === sec}
              />
              {sec / 60} min{" "}
            </label>
          )
        })}
      </p>
    </div>
  )
}
