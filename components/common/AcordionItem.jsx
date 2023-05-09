import React from 'react'

export default function AcordionItem({ title, children, collapse }) {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${collapse}`}
                    aria-expanded="false"
                    aria-controls={`collapse${collapse}`}
                >
                    {title}
                </button>
            </h2>
            <div
                id={`collapse${collapse}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
            >
                <div className="accordion-body">
                    {children}
                </div>
            </div>
        </div>

    )
}
