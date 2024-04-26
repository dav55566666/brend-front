"use client";
import 'swiper/css';
import React from 'react'
import MainBanner from './MainBanner/MainBanner';
import MainSale from './MainSale/MainSale';
import MainBrands from './MainBrands/MainBrands';

function Main() {
    return (
        <section className="main">
            <div className="main__container _container">
                <MainBanner />
                <MainSale />
                <MainBrands />
            </div>
        </section>
    )
}

export default Main
