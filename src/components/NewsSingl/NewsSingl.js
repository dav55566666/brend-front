"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectNews } from "../../store/slices/news/newsSlice"
import { useSearchParams } from 'next/navigation'
import { fetchNewsSingl } from '../../store/slices/news/newsApi'
import Loader from "../Loader/Loader"
import { CalendarIcon } from '../../svg'
import parse from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';
import Brendcrumbs from '../Brendcrumbs/Brendcrumbs'

function NewsSingl({ slug }) {
    const dispatch = useDispatch()
    const { newsSlingleData } = useSelector(selectNews)
    const [getNews, setGetNews] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if (newsSlingleData.id) {
            return setIsLoading(true), setGetNews(true);
        }
        if (!getNews) {
            dispatch(fetchNewsSingl({ newsId: slug }))
            setGetNews(true)
            setIsLoading(true)
        }
    }, [newsSlingleData])
    const cleanHtml = sanitizeHtml(newsSlingleData.content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'video', 'code']),
        allowedAttributes: {
            'img': ['src', 'alt', 'width', 'height'],
            'a': ['href'],
        },
    });
    return (
        <>
            {
                isLoading ?
                    <>
                        <Brendcrumbs title={newsSlingleData.title} links={[{ name: "Новости", link: "/news" }]} />
                        <section className='news-singl'>
                            <div className='news-singl__container _container'>
                                <div className='news-singl__date'>
                                    <span><CalendarIcon /> {newsSlingleData.updated?.slice(5, 7)}.{newsSlingleData.updated?.slice(0, 4)}.{newsSlingleData.updated?.slice(8, 10)} </span>
                                </div>
                                <div className='news-singl__text'>
                                    <h1>{newsSlingleData.title}</h1>
                                    {newsSlingleData.content && parse(newsSlingleData.content)}
                                </div>
                            </div>
                        </section>
                    </>
                    : <Loader />
            }
        </>
    )
}
export default NewsSingl