"use client";
import React, { memo, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProductItem from "../ProductItem/ProductItem"
import { useDispatch, useSelector } from 'react-redux';
import { selectTags, toggleFetchTags } from '../../store/slices/tags/tagsSlice';
import { fetchTags } from '../../store/slices/tags/tagsApi';

function Products({idx, fetch}) {
    const {getTags, tagsData} = useSelector(selectTags)
    const dispatch = useDispatch()

    useEffect(() => {
        if(tagsData.length < 1) {
            if(!getTags) {
                dispatch(toggleFetchTags())
                dispatch(fetchTags({limit: 20, fetch}))
            }
        }
    }, [tagsData])
    return (
        <>
            {   tagsData.length ?
                <section className="products">
                    <div className="products__container _container">
                        <div className="section-title">
                            <h2>{tagsData[idx].title}</h2>
                        </div>
                        <div className="products__swiper">
                            {
                                <Swiper slidesPerView={'auto'} loop={true} className="swiper">
                                    {
                                        tagsData[idx].products.map(el => (
                                            <SwiperSlide key={el?.id} className="swiper-slide"><ProductItem title={el?.title && el.title} img={"https://back.brend-instrument.ru" + el?.image} price={el?.price} salePrice={el?.special_price === 0 ? false : el?.special_price} slug={el?.slug} id={el.id} /></SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            }
                        </div>
                    </div>
                </section> : ""

            }
        </>

    )
}

export default memo(Products)