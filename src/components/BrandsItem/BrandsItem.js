import Image from 'next/image'
import React from 'react'

function BrandsItem({img, title}) {
    return (
        <>
            <img src={img} alt={title} />
            {/* <p>{title}</p> */}
        </>
    )
}

export default BrandsItem