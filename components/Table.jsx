import React from 'react'

export default function Table({ headers, data }) {
    return (
        <table className="table mt-5 mb-5">
            <thead>
                <tr>
                    {headers.map((item, index) => (
                        <th key={index} style={{ width: (headers.length === 4 ? "25%" : "33.33%") }} className="text-center" scope="col">
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {
                        data.map((item, index) => (
                            <td key={index} style={{ width: (data.length === 4 ? "25%" : "33.33%") }} className="text-center">
                                {item}
                            </td>
                        ))
                    }
                </tr>
            </tbody>
        </table>

    )
}
