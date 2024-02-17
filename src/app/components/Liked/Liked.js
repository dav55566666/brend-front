import React from 'react'
import ProductItem from "../ProductItem/ProductItem"

function Liked() {
    return (
        <section className="liked">
            <div className="liked__container _container">
                <h1>Избранное</h1>
                <div className="liked__grid">
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                </div>
            </div>
        </section>

    )
}

export default Liked