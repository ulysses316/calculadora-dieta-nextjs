import Image from 'next/image'

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <span className="app-header__logo">
          <Image src="/acupuntura.png" alt="Logotipo Acupuntura" width={44} height={46} priority />
        </span>
        <div>
          <h1 className="app-header__title">Calculadora de dieta</h1>
          <p className="app-header__subtitle">Requerimiento energético y distribución de macronutrientes</p>
        </div>
      </div>
    </header>
  )
}
