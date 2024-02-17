import Image from 'next/image'
import React from 'react'

function Banner({img, alt}) {
    return (
        <div className="banner">
            <div className="banner__container _container">
                <Image src={"/img/"+ img} alt={alt} width={1300} height={180} />
            </div>
        </div>
    )
}

export default Banner