"use client";
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '../../store/slices/products/productsSlice';
import ProductItem from "../ProductItem/ProductItem"

function Products({ title, link, tagId }) {
    const dispatch = useDispatch()
    const { productsByTagData } = useSelector(selectProducts)
    const [productsData, setProductsData] = useState([])
    useLayoutEffect(() => {
        if (productsByTagData.length) {
            productsByTagData.forEach((el, idx, arr) => {
                setProductsData([
                    ...el
                ])
            })
        }
    }, [productsByTagData])
    return (
        <section className="products">
            <div className="products__container _container">
                <div className="section-title">
                    <h2>{title}</h2>
                    <a href={link}>Смотреть все</a>
                </div>
                <div className="products__swiper">
                    <Swiper slidesPerView={'auto'} loop={true} className="swiper">
                        {
                            productsData.map(el => (
                                <SwiperSlide key={el.id} className="swiper-slide"><ProductItem title={el.title} img={el.image} price={el.price} salePrice={el.special_price === 0 ? false : el.special_price} id={el.id} /></SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </section>

    )
}

export default Products