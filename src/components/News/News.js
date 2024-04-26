"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectNews } from "../../store/slices/news/newsSlice"
import { fetchNews } from '../../store/slices/news/newsApi'
import Loader from "../Loader/Loader"
import NewsItem from "../NewsItem/NewsItem"
import Pagination from '../Pagination/Pagination'

function News() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [getNews, setGetNews] = useState(false)
    const [limit, setLimit] = useState(20)
    const { newsData } = useSelector(selectNews)
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (newsData.data?.length) {
            setIsLoading(true)
            return setGetNews(true)
        }
        if (!getNews) {
            dispatch(fetchNews({ limit, page }))
            setGetNews(true)
        }
    }, [newsData])

    const nextPage = useCallback(() => {
        if (page < newsData.lastPage) {
            dispatch(fetchNews({ limit: 20, page: page + 1 }));
            setPage(page + 1)
            window.scrollTo(0, 0);
            setLimit(20)
        }
    }, [page, newsData])

    const prevPage = useCallback(() => {
        if (page > 1) {
            dispatch(fetchNews({ limit: 20, page: page + 1 }));
            setPage(page - 1)
            setLimit(20)
            window.scrollTo(0, 0);
        }
    }, [page, newsData])

    const showMore = useCallback(() => {
        if (limit < newsData.total + 10) {
            dispatch(fetchNews({ limit: limit + 30, page: 1 }));
            setLimit(limit + 30)
        }
    }, [limit, newsData])
    return (
        <>
            {isLoading ?
                <section className='news'>
                    <div className='news__container _container'>
                        <h1>Новости</h1>
                        <div className='news__grid'>
                            {
                                newsData.data?.map(el => (
                                    <NewsItem key={el.id} img={el.image} title={el.title} id={el.id} day={el.updated.slice(5, 7)} year={el.updated.slice(0, 4)} mounth={el.updated.slice(8, 10)} slug={el.slug} />
                                ))
                            }
                        </div>
                        {
                            newsData.lastPage > 1 ?
                                <Pagination activePage={page} totalPages={newsData.lastPage} nextPage={nextPage} prevPage={prevPage} showMore={() => showMore()} /> : ""
                        }
                    </div>
                </section> : <Loader />
            }
        </>
    )
}

export default News