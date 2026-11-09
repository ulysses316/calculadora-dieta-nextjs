import { classifyBMI, formatInt } from '@/lib/nutrition'

export default function BodySummary({ bmi, weightByKind }) {
  const bmiClass = classifyBMI(bmi)

  return (
    <section className="panel" aria-labelledby="body-title">
      <div className="panel__head">
        <h2 id="body-title" className="panel__title"><span className="step">1</span>Composición</h2>
      </div>
      <dl className="stats">
        <div className="stat">
          <dt>IMC</dt>
          <dd>
            <span className="stat__value">{bmi.toFixed(1)}</span>
            <span className="stat__unit">kg/m²</span>
          </dd>
          <dd><span className={`chip chip--${bmiClass.tone}`}>{bmiClass.label}</span></dd>
        </div>
        <div className="stat">
          <dt>Peso ideal</dt>
          <dd>
            <span className="stat__value">{formatInt(weightByKind.ideal)}</span>
            <span className="stat__unit">kg</span>
          </dd>
          <dd className="stat__note">Estatura − 100</dd>
        </div>
        <div className="stat">
          <dt>Peso ajustado</dt>
          <dd>
            <span className="stat__value">{formatInt(weightByKind.adjusted)}</span>
            <span className="stat__unit">kg</span>
          </dd>
          <dd className="stat__note">Ideal + 25% del exceso</dd>
        </div>
      </dl>
    </section>
  )
}
