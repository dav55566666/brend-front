"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { selectVideo } from '@/store/slices/video/videoSlice';
import { fetchVideos } from '@/store/slices/video/videoApi';
import YouTube from 'react-youtube';

function Videos() {
    const dispatch = useDispatch()
    const {videosData} = useSelector(selectVideo)
    const [getVideos, setGetVideos] = useState(false)

    useEffect(() => {
        if(videosData?.data?.length) {
            return setGetVideos(true)
        }
        if(!getVideos) {
            dispatch(fetchVideos({page: 1, limit: 20}))
            setGetVideos(true)
        }
    }, [getVideos, videosData])

    return (
        <section className='videos'>
            <div className='videos__container _container'>
                <div className='section-title'>
                    <h2>Видеообзоры</h2>
                    <Link href={"/videos"} >Смотреть все</Link>
                </div>
                <Swiper slidesPerView={'auto'} loop={true} className="swiper videos__swiper">
                    {
                        videosData?.data?.map(el => (
                            <SwiperSlide key={el.id}>
                                <div className='videos__item'>
                                    <iframe src={el.video} allow="fullscreen;" referrerpolicy="strict-origin-when-cross-origin" />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default Videos