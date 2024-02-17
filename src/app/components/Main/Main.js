"use client";
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import React, { useEffect } from 'react'
import { ArrowNext, ArrowPrev, InfoIcon, TwoPoints } from '../../svg'
import { useDispatch, useSelector } from 'react-redux';
import { selectBrends } from '../../store/slices/brends/brendsSlice';
import { selectBanners } from '../../store/slices/banners/bannersSlice';
import { fetchBrends } from '../../store/slices/brends/brendsApi';
import { fetchBanners } from '../../store/slices/banners/bannersApi';
import ProductItem from '../ProductItem/ProductItem';

function Main() {

    const {brendsData} = useSelector(selectBrends)

    const {bannersData} = useSelector(selectBanners)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!bannersData?.length) {
            dispatch(fetchBanners())
        }
    }, [bannersData])

    useEffect(() => {
        if(!brendsData?.length) {
            dispatch(fetchBrends())
        }
    }, [brendsData])

    return (
        <section className="main">
            <div className="main__container _container">
                <div className="main__banner">
                    <Swiper >
                        {
                            bannersData?.map(banner => (
                                <SwiperSlide key={banner.id}>
                                    <img src={banner.img} alt="banner" />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <div className="main__sale">
                    <div className="main__sale-title">
                        <h4>
                            Успейте купить
                            <InfoIcon color={"#5A6672"} />
                        </h4>
                        <div className="main__sale-time">
                            <p>08</p>
                            <span>
                                <TwoPoints />
                            </span>
                            <p>00</p>
                            <span>
                            <TwoPoints />
                            </span>
                            <p>14</p>
                        </div>
                    </div>
                    <div className="main__slae-swiper">
                        <button className="slideprev">
                            <ArrowPrev />
                        </button>
                        <button className="slidenext">
                            <ArrowNext />
                        </button>
                        <Swiper>
                            <SwiperSlide>
                                <ProductItem title={"Аккумлятор MAKITA BL 1415"} img={"/img/IMG_9975-640x480 1.png"} price={"6900"} salePrice={"10.000"} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <ProductItem title={"Аккумлятор MAKITA BL 1415"} img={"/img/IMG_9975-640x480 1.png"} price={"6900"} salePrice={"10.000"} />
                            </SwiperSlide>
                        </Swiper>
                        <div className="main__sale-pagination swiper-pagination" />
                    </div>
                </div>
                <div className="main__brends">
                    <Swiper className='main__brends-swiper' spaceBetween={16} slidesPerView={"auto"}>
                        {
                            brendsData?.map(brend => (
                                <SwiperSlide key={brend.id}>
                                    <a href={"brend" + brend.id}>{brend.title}</a>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <a href="/" className="showmore">
                        <span>Еще</span>
                    </a>
                </div>
            </div>
        </section>

    )
}

export default Main