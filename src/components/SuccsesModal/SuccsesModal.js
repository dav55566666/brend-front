"use client"
import React, { useEffect } from 'react'

function SuccsesModal({succsesClick, title}) {
    useEffect(() => {
        setTimeout(() => {
            succsesClick(null)
        }, 2000);
    }, [])
    return (
        <div className='succses-modal'>
            <div className='succes-modal__container'>
                <p>{title}</p>
            </div>
        </div>
    )
}

export default SuccsesModal