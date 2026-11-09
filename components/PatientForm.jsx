import { ACTIVITY_LEVELS } from '@/lib/nutrition'

function NumberField({ id, label, unit, value, onChange, placeholder, step = 'any' }) {
  return (
    <div className="field">
      <label htmlFor={id} className="field__label">{label}</label>
      <div className="field__control">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="field__unit" aria-hidden="true">{unit}</span>
      </div>
    </div>
  )
}

export default function PatientForm({ patient, onChange, onReset }) {
  const set = (key) => (value) => onChange({ ...patient, [key]: value })

  return (
    <form className="panel patient" onSubmit={(e) => e.preventDefault()} aria-labelledby="patient-title">
      <div className="panel__head">
        <h2 id="patient-title" className="panel__title">Datos del paciente</h2>
        <button type="button" className="btn-ghost" onClick={onReset}>Nuevo paciente</button>
      </div>

      <div className="patient__grid">
        <NumberField id="weight" label="Peso" unit="kg" placeholder="80" value={patient.weight} onChange={set('weight')} />
        <NumberField id="height" label="Estatura" unit="cm" placeholder="160" value={patient.height} onChange={set('height')} />
        <NumberField id="age" label="Edad" unit="años" placeholder="30" step="1" value={patient.age} onChange={set('age')} />
      </div>

      <fieldset className="field">
        <legend className="field__label">Sexo</legend>
        <div className="segmented">
          {['Femenino', 'Masculino'].map((sex) => (
            <label key={sex} className="segmented__option">
              <input
                type="radio"
                name="sex"
                value={sex}
                checked={patient.sex === sex}
                onChange={() => set('sex')(sex)}
              />
              <span>{sex}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="field">
        <legend className="field__label">Actividad física</legend>
        <div className="activity">
          {ACTIVITY_LEVELS.map((level) => (
            <label key={level.value} className="activity__option">
              <input
                type="radio"
                name="activity"
                value={level.value}
                checked={patient.activity === level.value}
                onChange={() => set('activity')(level.value)}
              />
              <span className="activity__body">
                <span className="activity__label">{level.label}</span>
                <span className="activity__hint">{level.hint}</span>
              </span>
              <span className="activity__pct">+{level.pct}%</span>
            </label>
          ))}
        </div>
      </fieldset>
    </form>
  )
}
