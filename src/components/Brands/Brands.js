"use client";
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, fetchSinglBrendProducts } from '../../store/slices/brands/brandsApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArrowNext, ArrowPrev } from "../../svg";
import BrandsItem from '../BrandsItem/BrandsItem';
import { selectBrands } from '../../store/slices/brands/brandsSlice';
import Link from 'next/link';

function Brands() {
    const dispatch = useDispatch()
    const { brandsData } = useSelector(selectBrands)
    const [limit, setLimit] = useState(20)
    const [getBrands, setGetBrands] = useState(false)
    useEffect(() => {
        if (brandsData.length) {
            return setGetBrands(true)
        }
        if (!getBrands) {
            dispatch(fetchBrands({ limit: limit }))
        }
    }, [brandsData])

    const fetchSinglBrend = useCallback((id) => {
        dispatch(fetchSinglBrendProducts({ brendId: id, limit: 10, page: 1 }))
    }, [])
    return (
        <section className="brands">
            <div className="brands__container _container">
                <div className="section-title">
                    <h2>Наши бренды</h2>
                    <Link href="/brands">Смотреть все</Link>
                </div>
                <div className="brands__swiper">
                    <button className="slideprev" onClick={() => prevSlide()}>
                        <ArrowPrev />
                    </button>
                    <button className="slidenext" onClick={() => nextSlide()}>
                        <ArrowNext />
                    </button>
                    <Swiper slidesPerView={'auto'} loop={true} className="swiper">
                        {
                            brandsData.map(el => (
                                <SwiperSlide key={el.id} className="swiper-slide">
                                    <Link href={`/brandSingle/${el.slug}`} onClick={() => window.scrollTo(0, 0)}>
                                        <BrandsItem id={el.id} title={el.title} img={"https://back.brend-instrument.ru" + el.image} onClick={() => fetchSinglBrend(el.id)} />
                                    </Link>
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

export default Brands