import { useState } from 'react'
import Head from 'next/head'

import Header from '@/components/Header'
import PatientForm from '@/components/PatientForm'
import BodySummary from '@/components/BodySummary'
import EnergyMatrix from '@/components/EnergyMatrix'
import MacroTable from '@/components/MacroTable'
import {
  ACTIVITY_LEVELS,
  FORMULAS,
  GOALS,
  WEIGHT_KINDS,
  computeResults,
  missingFields,
} from '@/lib/nutrition'

const EMPTY_PATIENT = { weight: '', height: '', age: '', sex: '', activity: '1' }
const presetFor = (goal) => ({ ...GOALS.find((g) => g.value === goal).preset })

function listToText(items) {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`
}

export default function Home() {
  const [patient, setPatient] = useState(EMPTY_PATIENT)
  const [selection, setSelection] = useState(null)
  const [goal, setGoal] = useState('1')
  const [percents, setPercents] = useState(presetFor('1'))

  const missing = missingFields(patient)
  const results = missing.length === 0 ? computeResults(patient) : null

  const activityPct = ACTIVITY_LEVELS.find((a) => a.value === patient.activity).pct
  const selectedEnergy = results && selection ? results.energy[selection.kind][selection.formula] : null
  const sourceLabel = selection
    ? `${FORMULAS.find((f) => f.key === selection.formula).label}, ${WEIGHT_KINDS.find((k) => k.key === selection.kind).label.toLowerCase()}`
    : ''

  const handleGoalChange = (value) => {
    setGoal(value)
    setPercents(presetFor(value))
  }

  const handleReset = () => {
    setPatient(EMPTY_PATIENT)
    setSelection(null)
    setGoal('1')
    setPercents(presetFor('1'))
  }

  return (
    <>
      <Head>
        <title>Calculadora de dieta</title>
        <meta name="description" content="Made with ❤️ for Arely by Ulises" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="layout">
        <aside className="layout__side">
          <PatientForm patient={patient} onChange={setPatient} onReset={handleReset} />
        </aside>

        <div className="layout__main">
          {results ? (
            <>
              <BodySummary bmi={results.bmi} weightByKind={results.weightByKind} />
              <EnergyMatrix
                energy={results.energy}
                weightByKind={results.weightByKind}
                activityPct={activityPct}
                selection={selection}
                onSelect={setSelection}
              />
              {selectedEnergy ? (
                <MacroTable
                  totalKcal={selectedEnergy.total}
                  sourceLabel={sourceLabel}
                  goal={goal}
                  onGoalChange={handleGoalChange}
                  percents={percents}
                  onPercentChange={(key, value) => setPercents((p) => ({ ...p, [key]: value }))}
                  onResetPercents={() => setPercents(presetFor(goal))}
                />
              ) : (
                <section className="panel panel--placeholder">
                  <h2 className="panel__title"><span className="step">3</span>Distribución de macronutrientes</h2>
                  <p>Elige una opción del requerimiento energético para calcular carbohidratos, proteína y lípidos.</p>
                </section>
              )}
            </>
          ) : (
            <section className="panel panel--placeholder empty">
              <h2 className="panel__title">Los resultados aparecerán aquí</h2>
              <p>
                Captura {listToText(missing)} del paciente. Al completarlos verás el IMC, el peso ideal y ajustado,
                el gasto energético con Harris-Benedict y Mifflin-St Jeor, y la distribución de macronutrientes.
              </p>
              <ol className="empty__steps">
                <li>Composición corporal</li>
                <li>Requerimiento energético</li>
                <li>Macronutrientes</li>
              </ol>
            </section>
          )}
        </div>
      </main>
    </>
  )
}
