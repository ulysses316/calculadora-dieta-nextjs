import React from 'react'

export default function AcordionBody({children}) {
    return (
        <div className="accordion" id="accordionExample">
            {children}
        </div>
    )
}
