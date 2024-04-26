"use client"
import React, { memo, useEffect, useLayoutEffect, useState } from 'react'
import 'swiper/css';
import ProductItem from "../ProductItem/ProductItem"
import { useDispatch, useSelector } from 'react-redux';
import { selectTags, toggleFetchTags } from '../../store/slices/tags/tagsSlice';
import { fetchTags } from '../../store/slices/tags/tagsApi';

function Sale({ fetch, idx }) {
    const { getTags, tagsData } = useSelector(selectTags)
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        if (!getTags && !tagsData?.length) {
            dispatch(toggleFetchTags())
            dispatch(fetchTags({ limit: 20, fetch }))
        }
    }, [tagsData])
    return (
        <section className='sale'>
            <div className='sale__container _container'>
                <h1>{tagsData[idx]?.title}</h1>
                <div className='sale__grid'>
                    {
                        tagsData[idx]?.products.map(el => (
                            <ProductItem key={el?.id} title={el?.title && el.title} img={"https://back.brend-instrument.ru" + el?.image} price={el?.price} salePrice={el?.special_price === 0 ? false : el?.special_price} id={el?.id} slug={el.slug} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Sale