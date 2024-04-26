"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import ProductItem from '../ProductItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectBrands } from '../../store/slices/brands/brandsSlice';
import { fetchSinglBrendProducts } from '../../store/slices/brands/brandsApi';
import Pagination from "../Pagination/Pagination"
import Brendcrumbs from "../Brendcrumbs/Brendcrumbs"
import { useRouter } from 'next/router';

function Brandsingle({slug}) {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { singleBrendData } = useSelector(selectBrands);
    const [getBrend, setGetBrend] = useState(false)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(30)
    const router = useRouter()

    useEffect(() => {
        if(singleBrendData?.products?.length < limit) {
            setGetBrend(true)
        }
        if(!getBrend) {
            dispatch(fetchSinglBrendProducts({ brendId: slug, limit: limit, page: page }));
            setGetBrend(true)
        }
    }, [singleBrendData])
    
    const nextPage = useCallback(() => {
        if(page < singleBrendData.lastPage) {
            dispatch(fetchSinglBrendProducts({ brendId: slug, limit: 20, page: page+1 }));
            setPage(page+1)
            window.scrollTo(0, 0);
            setLimit(20)
        }
    }, [page, singleBrendData])

    const prevPage = useCallback(() => {
        if(page > 1) {
            dispatch(fetchSinglBrendProducts({ brendId: slug, limit: 20, page: page+1 }));
            setPage(page-1)
            setLimit(20)
            window.scrollTo(0, 0);
        }
    }, [page, singleBrendData])

    const showMore = useCallback(() => {
        if(limit < singleBrendData.total + 10) {
            dispatch(fetchSinglBrendProducts({ brendId: slug, limit: limit +30, page: 1 }));
            setLimit(limit + 30)
        }
    }, [limit, singleBrendData])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [router])

    return (
        <>
            {
                isLoading ?
                <>
                <Brendcrumbs title={singleBrendData?.brand?.title} links={[{name: "Бренды", link: '/brands'}]} />
                    <section className='brend-single'>
                        <div className='brend-single__container _container'>
                            <h1>{singleBrendData?.brand?.title}</h1>
                            <div className='brend-single__grid'>
                                {
                                    singleBrendData?.products?.map(el => (
                                        <ProductItem key={el.id} title={el.title} img={el.image ? "https://back.brend-instrument.ru" + el.image : null} price={el.price} salePrice={el.special_price === 0 ? false : el.special_price} id={el.id} slug={el.slug} />
                                    ))
                                }
                            </div>
                            {
                                singleBrendData.lastPage > 0 ?
                                <Pagination activePage={page} totalPages={singleBrendData.lastPage} nextPage={nextPage} prevPage={prevPage} showMore={() => showMore()} /> : ""
                            }
                        </div>
                    </section> 
                </> : <Loader />
            }
        </>
    )
}

export default Brandsingle