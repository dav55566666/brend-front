"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCart } from '../../../store/slices/cart/cartSlice'
import Link from 'next/link'
import { BasketIcon } from '../../../svg'
import { selectUsers } from '../../../store/slices/users/usersSlice'
import { fetchCart } from '../../../store/slices/cart/cartApi'

function CartBtn() {
    const {cartData, guestUserId} = useSelector(selectCart)
    const {loginData} = useSelector(selectUsers)
    const [getCart, setGetCart] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if(guestUserId || loginData.access_token) {
            if(!cartData.length) {
                if(!getCart) {
                    dispatch(fetchCart({ userToken: loginData.access_token, guestUserId: guestUserId }))
                    setGetCart(true)
                }
            }
        }
    }, [cartData, loginData, guestUserId])
    return (
        <Link href="/basket">
            <BasketIcon />
            <span>Корзина</span>
            <span className='num'>{cartData?.length ? cartData?.length : "0"}</span>
        </Link>
    )
}

export default CartBtn