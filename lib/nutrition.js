import { calcIMC, calcBenedict, calcMifflin, calcETA, calcFAF, calcWeight } from '@/services/index'

export const ACTIVITY_LEVELS = [
  { value: '1', label: 'Nula', pct: 15, hint: 'Sedentario' },
  { value: '2', label: 'Poca', pct: 30, hint: '1–2 días/semana' },
  { value: '3', label: 'Moderada', pct: 45, hint: '3–5 días/semana' },
  { value: '4', label: 'Mucha', pct: 60, hint: 'Diario o intenso' },
]

export const GOALS = [
  { value: '1', label: 'Normal', preset: { carbs: 55, protein: 15, lipids: 30 } },
  { value: '2', label: 'Bajar de peso', preset: { carbs: 50, protein: 25, lipids: 25 } },
  { value: '3', label: 'Aumentar masa muscular', preset: { carbs: 55, protein: 30, lipids: 15 } },
]

export const FORMULAS = [
  { key: 'benedict', label: 'Harris-Benedict', calc: calcBenedict },
  { key: 'mifflin', label: 'Mifflin-St Jeor', calc: calcMifflin },
]

export const WEIGHT_KINDS = [
  { key: 'current', label: 'Peso actual' },
  { key: 'adjusted', label: 'Peso ajustado' },
  { key: 'ideal', label: 'Peso ideal' },
]

export const MACROS = [
  { key: 'carbs', label: 'Carbohidratos', kcalPerGram: 4 },
  { key: 'protein', label: 'Proteína', kcalPerGram: 4 },
  { key: 'lipids', label: 'Lípidos', kcalPerGram: 9 },
]

const fmt = new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 })
export const formatInt = (n) => fmt.format(Math.round(n))

export function classifyBMI(bmi) {
  if (bmi < 18.5) return { label: 'Bajo peso', tone: 'warn' }
  if (bmi < 25) return { label: 'Normal', tone: 'good' }
  if (bmi < 30) return { label: 'Sobrepeso', tone: 'warn' }
  if (bmi < 35) return { label: 'Obesidad I', tone: 'bad' }
  if (bmi < 40) return { label: 'Obesidad II', tone: 'bad' }
  return { label: 'Obesidad III', tone: 'bad' }
}

export function missingFields(patient) {
  const missing = []
  if (!(Number(patient.weight) > 0)) missing.push('peso')
  if (!(Number(patient.height) > 0)) missing.push('estatura')
  if (!(Number(patient.age) > 0)) missing.push('edad')
  if (!patient.sex) missing.push('sexo')
  return missing
}

// Same formulas as services/index.js, grouped by weight and formula.
export function computeResults(patient) {
  const weight = Number(patient.weight)
  const height = Number(patient.height)
  const age = Number(patient.age)
  const { sex, activity } = patient

  const weights = calcWeight(weight, height)
  const weightByKind = {
    current: weight,
    adjusted: weights.pesoAjustado,
    ideal: weights.pesoIdeal,
  }

  const energy = {}
  for (const kind of WEIGHT_KINDS) {
    energy[kind.key] = {}
    for (const formula of FORMULAS) {
      const tmb = formula.calc(weightByKind[kind.key], height, age, sex)
      const eta = calcETA(tmb)
      const af = calcFAF(tmb, activity)
      energy[kind.key][formula.key] = { tmb, eta, af, total: tmb + eta + af }
    }
  }

  return {
    bmi: Number(calcIMC(weight, height)),
    weightByKind,
    energy,
  }
}
