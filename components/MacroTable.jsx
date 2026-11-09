import { GOALS, MACROS, formatInt } from '@/lib/nutrition'

export default function MacroTable({ totalKcal, sourceLabel, goal, onGoalChange, percents, onPercentChange, onResetPercents }) {
  const rows = MACROS.map((m) => {
    const pct = Number(percents[m.key]) || 0
    const kcal = (totalKcal * pct) / 100
    return { ...m, pct, kcal, grams: Math.round(kcal / m.kcalPerGram) }
  })
  const totalPct = rows.reduce((sum, r) => sum + r.pct, 0)
  const totalGrams = rows.reduce((sum, r) => sum + r.grams, 0)
  const diff = 100 - totalPct
  const preset = GOALS.find((g) => g.value === goal).preset
  const isPreset = MACROS.every((m) => Number(percents[m.key]) === preset[m.key])

  return (
    <section className="panel" aria-labelledby="macro-title">
      <div className="panel__head">
        <h2 id="macro-title" className="panel__title"><span className="step">3</span>Distribución de macronutrientes</h2>
        <p className="panel__help">
          Base: <strong className="num">{formatInt(totalKcal)} kcal</strong> · {sourceLabel}
        </p>
      </div>

      <fieldset className="field">
        <legend className="field__label">Meta</legend>
        <div className="segmented segmented--wrap">
          {GOALS.map((g) => (
            <label key={g.value} className="segmented__option">
              <input type="radio" name="goal" value={g.value} checked={goal === g.value} onChange={() => onGoalChange(g.value)} />
              <span>{g.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="split" aria-hidden="true">
        {rows.map((r) => (
          <span key={r.key} className={`split__seg split__seg--${r.key}`} style={{ flexGrow: r.pct }} />
        ))}
        {diff > 0 && <span className="split__seg split__seg--empty" style={{ flexGrow: diff }} />}
      </div>

      <div className="table-wrap">
        <table className="macros">
          <thead>
            <tr>
              <th scope="col">Nutrimento</th>
              <th scope="col" className="num">%</th>
              <th scope="col" className="num">Kcal</th>
              <th scope="col" className="num">Gramos</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <th scope="row">
                  <span className={`dot dot--${r.key}`} aria-hidden="true" />
                  {r.label}
                  <span className="macros__factor">{r.kcalPerGram} kcal/g</span>
                </th>
                <td className="num">
                  <span className="pct-input">
                    <input
                      id={`pct-${r.key}`}
                      type="number"
                      inputMode="numeric"
                      min="0"
                      max="100"
                      value={percents[r.key]}
                      onChange={(e) => onPercentChange(r.key, e.target.value)}
                      aria-label={`Porcentaje de ${r.label}`}
                    />
                    <span aria-hidden="true">%</span>
                  </span>
                </td>
                <td className="num">{formatInt(r.kcal)}</td>
                <td className="num macros__grams">{formatInt(r.grams)} g</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Total</th>
              <td className="num">{formatInt(totalPct)}%</td>
              <td className="num">{formatInt((totalKcal * totalPct) / 100)}</td>
              <td className="num">{formatInt(totalGrams)} g</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="macro-status">
        {diff === 0 ? (
          <span className="chip chip--good">La distribución suma 100%</span>
        ) : (
          <span className="chip chip--bad" role="status">
            {diff > 0 ? `Faltan ${formatInt(diff)} puntos para llegar a 100%` : `Te pasas ${formatInt(-diff)} puntos de 100%`}
          </span>
        )}
        {!isPreset && (
          <button type="button" className="btn-ghost" onClick={onResetPercents}>
            Restablecer valores de la meta
          </button>
        )}
      </div>
    </section>
  )
}
