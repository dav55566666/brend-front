import Image from 'next/image'
import React from 'react'

function BrendsItem({img, title}) {
    return (
        <>
            <img src={img} alt={title} />
            <p>{title}</p>
        </>
    )
}

export default BrendsItem