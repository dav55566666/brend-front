"use client"
import React, { useEffect, useState } from 'react'
import BasketItem from '../BasketItem/BasketItem'
import { useDispatch, useSelector } from 'react-redux'
import { selectCart } from '../../store/slices/cart/cartSlice'
import { fetchCart } from '../../store/slices/cart/cartApi'
import { selectUsers } from '../../store/slices/users/usersSlice'
import { useRouter } from 'next/router'

function BasketTable() {
    const {cartData, guestUserId} = useSelector(selectCart)
    const [getCart, setGetCart] = useState(false)
    const {loginData} = useSelector(selectUsers)
    const dispatch = useDispatch()
    const {pathname} = useRouter()
    useEffect(() => {
        if(cartData.length < 1) {
            if(!getCart) {
                dispatch(fetchCart({ userToken: loginData.access_token, guestUserId: guestUserId }))
                setGetCart(true)
            }
        }
    }, [cartData])
    useEffect(() => {}, [pathname])
    return (
        <div className="basket__products">
            <div className="basket__products-title">
                <p>№</p>
                <p>Фото</p>
                <p>Наименование</p>
                <p>Цена</p>
                <p>Количество</p>
                <p>Сумма</p>
                {
                    pathname !== "/checkout" ?
                    <p>удалить</p> : ""
                }
            </div>
            {
                cartData.length && 
                cartData?.map((el, idx) => (
                    <BasketItem key={el.id} image={el.attributes.image} price={el.price} quantity={el.quantity && el.quantity} number={idx+1} name={el.name} productId={el.id} removeBtn={true} maxCount={el.associatedModel?.quantity && el.associatedModel?.quantity} />
                ))
            }
        </div>
    )
}

export default BasketTable