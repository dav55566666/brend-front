"use client"
import React, { useEffect, useState } from 'react'
import ProductItem from "../ProductItem/ProductItem"
import { useDispatch, useSelector } from 'react-redux'
import { selectLiked } from '../../store/slices/liked/likedSlice'
import { fetchLiked } from '../../store/slices/liked/likedApi'
import Loader from '../Loader/Loader'
import { selectUsers } from '../../store/slices/users/usersSlice'
import { DubbleArrowLeftIcon, LikeIcon } from '@/svg'
import Link from "next/link"

function Liked() {
    const dispatch = useDispatch()
    const { likedData, uuId } = useSelector(selectLiked)
    const [isLoading, setIsLoading] = useState(false)
    const [hasFetchedLiked, setHasFetchedLiked] = useState(false)
    const { loginData } = useSelector(selectUsers)

    useEffect(() => {
        if (!hasFetchedLiked) {
            dispatch(fetchLiked({ userToken: loginData.access_token, guestUserId: uuId }))
            setHasFetchedLiked(true)
            setIsLoading(true)
        }
    }, [likedData])

    useEffect(() => { }, [hasFetchedLiked])
    return (
        <>
            {isLoading ?
                <section className="liked">
                    <div className="liked__container _container">
                        <h1>Избранное</h1>
                        {
                            likedData.length ? (
                                <div className="liked__grid">
                                    {
                                        likedData?.map(product => (
                                            <ProductItem key={product.id} title={product.name} img={product.attributes.image && `https://back.brend-instrument.ru/${product.attributes.image}`} price={product.price} salePrice={product.special_price === 0 ? false : product.special_price} id={product.id} slug={product.attributes.slug} />
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className='liked__empty'>
                                    <p>Раздел Избранное все еще пуст.</p>
                                    <p>Нажмите на <LikeIcon /> чтобы добавить товар в избранное.</p>
                                    <Link href={"/"}> <DubbleArrowLeftIcon /> Вернуться в магазин</Link>
                                </div>
                            )
                        }
                    </div>
                </section> : <Loader />
            }
        </>

    )
}

export default Liked