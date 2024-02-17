import Image from 'next/image'
import React from 'react'

function RequestProduct() {
    return (
        <section className="request-product">
            <div className="request-product__container _container">
                <h2>Заявка на подбор товара!</h2>
                <div className="request-product__img">
                    <Image src="/img/ser-top 1.png" alt="img" width={418} height={274}/>
                </div>
                <button>Связаться с менеджером</button>
            </div>
        </section>
    )
}

export default RequestProduct