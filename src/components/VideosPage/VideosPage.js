"use client"
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { selectVideo } from '@/store/slices/video/videoSlice';
import { fetchVideos } from '@/store/slices/video/videoApi';
import YouTube from 'react-youtube';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader'

function VideosPage() {
    const dispatch = useDispatch()
    const { videosData } = useSelector(selectVideo)
    const [getVideos, setGetVideos] = useState(false)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(30)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (videosData.length) {
            return setGetVideos(true)
        }
        if (!getVideos) {
            dispatch(fetchVideos({ page: page, limit: limit }))
            setGetVideos(true)
        }
    }, [getVideos, videosData])

    const nextPage = useCallback(() => {
        if(page < videosData.lastPage) {
            dispatch(fetchVideos({ limit: 20, page: page+1 }));
            setPage(page+1)
            window.scrollTo(0, 0);
            setLimit(20)
        }
    }, [page, videosData])

    const prevPage = useCallback(() => {
        if(page > 1) {
            dispatch(fetchVideos({ limit: 20, page: page+1 }));
            setPage(page-1)
            setLimit(20)
            window.scrollTo(0, 0);
        }
    }, [page, videosData])

    const showMore = useCallback(() => {
        if(limit < videosData.total + 10) {
            dispatch(fetchVideos({ limit: limit +30, page: 1 }));
            setLimit(limit + 30)
        }
    }, [limit, videosData])

    return (
        <>
            {   isLoading ?
                <section className='videos-page'>
                    <div className='videos-page__container _container'>
                        <h1>Видеообзоры</h1>
                        <div className='videos-page__grid'>
                            {
                                videosData?.data?.map(el => (
                                    <div className='videos__item' key={el.id} >
                                        <iframe src={el.video} referrerpolicy="strict-origin-when-cross-origin" />
                                    </div>
                                ))
                            }
                        </div>
                        {
                            videosData.lastPage > 1 ?
                                <Pagination activePage={page} totalPages={videosData.lastPage} nextPage={nextPage} prevPage={prevPage} showMore={() => showMore()} /> : ""
                        }
                    </div>
                </section> : <Loader />
            }
        </>
    )
}

export default VideosPage