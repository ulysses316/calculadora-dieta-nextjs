import React from 'react'
import { useState } from 'react'
import { calcIMC, calcBenedict, calcMifflin, calcETA, calcFAF, calcWeight } from '../services/index'

export default function Form({ onDataProcessed }) {

    const [weight, setWeight] = useState();
    const [size, setSize] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [faf, setFaf] = useState("1");

    const handleSubmit = () => {

        const IMC = calcIMC(weight, size);
        const weights = calcWeight(weight, size)

        // Current Weight
        const benedict = calcBenedict(weight, size, age, gender);
        const mifflin = calcMifflin(weight, size, age, gender)
        const benedictETA = calcETA(benedict)
        const mifflintETA = calcETA(mifflin)
        const benedictFAF = calcFAF(benedict, faf)
        const mifflinFAF = calcFAF(mifflin, faf)

        // Ideal Weight
        const benedictIdeal = calcBenedict(weights.pesoIdeal, size, age, gender);
        const mifflinIdeal = calcMifflin(weights.pesoIdeal, size, age, gender)
        const benedictETAIdeal = calcETA(benedictIdeal)
        const mifflintETAIdeal = calcETA(mifflinIdeal)
        const benedictFAFIdeal = calcFAF(benedictIdeal, faf)
        const mifflinFAFIdeal = calcFAF(mifflinIdeal, faf)

        // Adjusted Weight
        const benedictAdjusted = calcBenedict(weights.pesoAjustado, size, age, gender);
        const mifflinAdjusted = calcMifflin(weights.pesoAjustado, size, age, gender)
        const benedictETAAdjusted = calcETA(benedictAdjusted)
        const mifflintETAAdjusted = calcETA(mifflinAdjusted)
        const benedictFAFAdjusted = calcFAF(benedictAdjusted, faf)
        const mifflinFAFAdjusted = calcFAF(mifflinAdjusted, faf)

        onDataProcessed({
            primary: {
                IMC: IMC,
                ideal: weights.pesoIdeal,
                adjusted: weights.pesoAjustado
            },
            current: {
                benedict: benedict,
                mifflin: mifflin,
                benedictETA: benedictETA,
                benedictFAF: benedictFAF,
                mifflintETA: mifflintETA,
                mifflinFAF: mifflinFAF,
                benedictTotal: benedict + benedictETA + benedictFAF,
                mifflinTotal: mifflin + mifflintETA + mifflinFAF
            },
            ideal: {
                benedict: benedictIdeal,
                mifflin: mifflinIdeal,
                benedictETA: benedictETAIdeal,
                benedictFAF: benedictFAFIdeal,
                mifflintETA: mifflintETAIdeal,
                mifflinFAF: mifflinFAFIdeal,
                benedictTotal: benedictIdeal + benedictETAIdeal + benedictFAFIdeal,
                mifflinTotal: mifflinIdeal + mifflintETAIdeal + mifflinFAFIdeal
            },
            adjusted: {
                benedict: benedictAdjusted,
                mifflin: mifflinAdjusted,
                benedictETA: benedictETAAdjusted,
                benedictFAF: benedictFAFAdjusted,
                mifflintETA: mifflintETAAdjusted,
                mifflinFAF: mifflinFAFAdjusted,
                benedictTotal: benedictAdjusted + benedictETAAdjusted + benedictFAFAdjusted,
                mifflinTotal: mifflinAdjusted + mifflintETAAdjusted + mifflinFAFAdjusted
            }
        })
    }

    return (
        <section className="mt-3">
            <form onClick={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="weight" className="form-label">
                        Peso en kg
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Ejemplo: 80"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="size" className="form-label">
                        Estatura en CM
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Ejemplo: 160"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                        Edad
                    </label>
                    <input type="number" className="form-control" placeholder={18} value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <label htmlFor="gender" className="form-label">
                    Sexo
                </label>
                <div className="d-flex justify-content-around align-items-center pt-3 pb-3">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            onChange={(e) => setGender("Masculino")}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Masculino
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            onChange={(e) => setGender("Femenino")}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Femenino
                        </label>
                    </div>
                </div>
                <label htmlFor="physical-activity" className="form-label">
                    Actividad fisica
                </label>
                <select className="form-select" onChange={(e) => setFaf(e.target.value)}>
                    <option value={1}>Nula (15%)</option>
                    <option value={2}>Poca (30%)</option>
                    <option value={3}>Moderada (45%)</option>
                    <option value={4}>Mucha (60%)</option>
                </select>
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <button type="submit" className="btn btn-primary">
                        Enviar
                    </button>
                </div>
            </form>
        </section>

    )
}
