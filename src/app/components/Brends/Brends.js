"use client";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrends } from '../../store/slices/brends/brendsApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArrowNext, ArrowPrev } from "../../svg";
import BrendsItem from '../BrendsItem/BrendsItem';
import { selectBrends } from '../../store/slices/brends/brendsSlice';

function Brends() {
    const dispatch = useDispatch()
    const {brendsData} = useSelector(selectBrends)
    useEffect(() => {
        if(!brendsData.length) {
            dispatch(fetchBrends({ limit: 20 }))
        }
    }, [brendsData])
    return (
        <section className="brends">
            <div className="brends__container _container">
                <div className="section-title">
                    <h2>Наши бренды</h2>
                    <a href="/">Смотреть все</a>
                </div>
                <div className="brends__swiper">
                    <button className="slideprev" onClick={() => prevSlide()}>
                        <ArrowPrev />
                    </button>
                    <button className="slidenext" onClick={() => nextSlide()}>
                        <ArrowNext />
                    </button>
                    <Swiper slidesPerView={'auto'} loop={true}  className="swiper">
                        {
                            brendsData.map(el => (
                                <SwiperSlide key={el.id} className="swiper-slide">
                                    <BrendsItem title={el.title} img={el.image} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <div className="swiper-pagination" />
                </div>
            </div>
        </section>

    )
}

export default Brends