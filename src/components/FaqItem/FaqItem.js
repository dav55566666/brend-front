"use client"
import React, { useState } from 'react'

function FaqItem({ title, desc }) {
    const [toggle, setToggle] = useState(false)
    return (
        <div className="faq__item">
            <div className="faq__item-title">
                <h4>{title}</h4>
                <div className="icon" onClick={() => setToggle(!toggle)}>
                    <span />
                    {!toggle && <span />}
                </div>
            </div>
            {toggle &&
                <div className="faq__item-hiden">
                    <p>{desc}</p>
                </div>
            }
        </div>
    )
}

export default FaqItem