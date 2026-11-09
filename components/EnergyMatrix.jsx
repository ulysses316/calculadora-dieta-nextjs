import { FORMULAS, WEIGHT_KINDS, formatInt } from '@/lib/nutrition'

export default function EnergyMatrix({ energy, weightByKind, activityPct, selection, onSelect }) {
  return (
    <section className="panel" aria-labelledby="energy-title">
      <div className="panel__head">
        <h2 id="energy-title" className="panel__title"><span className="step">2</span>Requerimiento energético</h2>
        <p className="panel__help">Elige el gasto energético total que usarás para la dieta.</p>
      </div>

      <div className="matrix" role="radiogroup" aria-labelledby="energy-title">
        <div className="matrix__corner" aria-hidden="true" />
        {FORMULAS.map((f) => (
          <div key={f.key} className="matrix__colhead" aria-hidden="true">{f.label}</div>
        ))}

        {WEIGHT_KINDS.map((kind) => (
          <div key={kind.key} className="matrix__row">
            <div className="matrix__rowhead">
              <span>{kind.label}</span>
              <span className="matrix__weight">{formatInt(weightByKind[kind.key])} kg</span>
            </div>
            {FORMULAS.map((f) => {
              const e = energy[kind.key][f.key]
              const id = `energy-${kind.key}-${f.key}`
              const checked = selection?.kind === kind.key && selection?.formula === f.key
              return (
                <label key={f.key} htmlFor={id} className="option">
                  <input
                    id={id}
                    type="radio"
                    name="energy"
                    checked={checked}
                    onChange={() => onSelect({ kind: kind.key, formula: f.key })}
                    aria-label={`${kind.label}, ${f.label}: ${formatInt(e.total)} kcal`}
                  />
                  <span className="option__formula">{f.label}</span>
                  <span className="option__total">
                    {formatInt(e.total)}
                    <span className="option__unit">kcal</span>
                  </span>
                  <span className="option__breakdown">
                    <span>TMB {formatInt(e.tmb)}</span>
                    <span>ETA {formatInt(e.eta)}</span>
                    <span>AF {formatInt(e.af)}</span>
                  </span>
                </label>
              )
            })}
          </div>
        ))}
      </div>
      <p className="footnote">
        TMB: tasa metabólica basal · ETA: efecto térmico de los alimentos (10%) · AF: actividad física (+{activityPct}%)
      </p>
    </section>
  )
}
