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
    }, [goal])

    return (

        <>
        <style jsx>
            {
                `

                th, td{
                    width: 25%;
                }

                input{
                    border: none;
                    background-color: transparent;
                    font-weight: 600;
                    width: 100%
                }
                `
            }
        </style>

            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Nutrimento</th>
                        <th>%</th>
                        <th>Kcal</th>
                        <th>Gramos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Carbohidratos</th>
                        <td><input type="number" value={CHPorcent} onChange={(e) => setCHPorcent(e.target.value)} /></td>
                        <td>{(caloriasTotal * CHPorcent) / 100}</td>
                        <td>{Math.round(((caloriasTotal * CHPorcent) / 100)/4)}</td>
                    </tr>
                    <tr>
                        <th>Proteina</th>
                        <td><input type="number" value={protPorcent} onChange={(e) => setProtPorcent(e.target.value)} /></td>
                        <td>{(caloriasTotal * protPorcent) / 100}</td>
                        <td>{Math.round(((caloriasTotal * protPorcent) / 100)/4)}</td>
                    </tr>
                    <tr>
                        <th>Lipido</th>
                        <td><input type="number" value={liPorcent} onChange={(e) => setLiPorcent(e.target.value)} /></td>
                        <td>{(caloriasTotal * liPorcent) / 100}</td>
                        <td>{Math.round(((caloriasTotal * liPorcent) / 100)/9)}</td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>{parseInt(CHPorcent) + parseInt(protPorcent) + parseInt(liPorcent)}</td>
                        <td>{caloriasTotal}</td>
                        <td>{Math.round(((caloriasTotal * CHPorcent) / 100)/4) + Math.round(((caloriasTotal * protPorcent) / 100)/4) + Math.round(((caloriasTotal * liPorcent) / 100)/9)}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
