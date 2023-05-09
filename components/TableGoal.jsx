import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'


export default function TableGoal({ caloriasTotal, goal }) {

    const [CHPorcent, setCHPorcent] = useState()
    const [protPorcent, setProtPorcent] = useState()
    const [liPorcent, setLiPorcent] = useState()

    useEffect(() => {
        if (goal === "1") {
            setCHPorcent(55);
            setProtPorcent(15);
            setLiPorcent(30);
        }
        else if (goal === "2") {
            setCHPorcent(50);
            setProtPorcent(25);
            setLiPorcent(25);
        }
        else {
            setCHPorcent(55);
            setProtPorcent(30);
            setLiPorcent(15);
        }
    }, [])

    return (

        <>
        <style jsx>
            {
                `
                input{
                    border: none;
                    background-color: transparent;
                    font-weight: 600;
                }
                `
            }
        </style>

            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th scope="col">Nutrimento</th>
                        <th scope="col">%</th>
                        <th scope="col">Kcal</th>
                        <th scope="col">Gramos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Carbohidratos</th>
                        <td><input type="number" value={CHPorcent} onChange={(e) => setCHPorcent(e.target.value)} /></td>
                        <td>{(caloriasTotal * CHPorcent) / 100}</td>
                        <td>{Math.round(caloriasTotal / 4)}</td>
                    </tr>
                    <tr>
                        <th>Proteina</th>
                        <td><input type="number" value={protPorcent} onChange={(e) => setProtPorcent(e.target.value)} /></td>
                        <td>{(caloriasTotal * protPorcent) / 100}</td>
                        <td>{Math.round(caloriasTotal / 4)}</td>
                    </tr>
                    <tr>
                        <th>Lipido</th>
                        <td><input type="number" value={liPorcent} onChange={(e) => setLiPorcent(e.target.value)} /></td>
                        <td>{(caloriasTotal * liPorcent) / 100}</td>
                        <td>{Math.round(caloriasTotal / 9)}</td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>100</td>
                        <td>{caloriasTotal}</td>
                        <td>{Math.round(caloriasTotal / 4) + Math.round(caloriasTotal / 4) + Math.round(caloriasTotal / 9)}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
