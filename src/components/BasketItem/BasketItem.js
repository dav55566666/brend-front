"use client";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from "../../store/slices/cart/cartSlice"
import { fetchDeleteCart, fetchUpdateCart } from '../../store/slices/cart/cartApi';
import { selectUsers } from '../../store/slices/users/usersSlice';
import { MinusIcon, PlusIcon, RemoveIcon } from '../../svg';
import { useRouter } from 'next/router';

function BasketItem({image, price, quantity, number, name, productId, removeBtn, maxCount}) {
    const {loginData} = useSelector(selectUsers)
    const {guestUserId} = useSelector(selectCart)
    const dispatch = useDispatch()
    const {pathname} = useRouter()
    const removeProduct = (productId) => {
        dispatch(fetchDeleteCart({userToken: loginData.access_token, productId, guestUserId: guestUserId}))
    }
    const updateCart = (productId, initialCount, type, maxCount) => {
        if(type === "-") {
            if(initialCount > 1) {
                dispatch(fetchUpdateCart({userToken: loginData.access_token, productId, productCount: (initialCount * 1) - 1, guestUserId: guestUserId }))
            }else {
                dispatch(fetchDeleteCart({userToken: loginData.access_token, productId, guestUserId: guestUserId}))
            }
        }
        if(type === "+" && initialCount < maxCount) {
            dispatch(fetchUpdateCart({userToken: loginData.access_token, productId, productCount: (initialCount * 1) + 1, guestUserId: guestUserId }))
        }
    }
    useEffect(() => {}, [pathname])
    return (
        <div className="basket__item">
            <p>{number}</p>
            <div className="basket__item-img">
                <img src={"https://back.brend-instrument.ru" + image} alt='img' />
            </div>
            <h4>{name}</h4>
            <p className="price">{price} ₽</p>
            <div className="counter">
                <div className="counter-flex">
                    {
                        pathname !== "/checkout" && pathname !== "/orderSingle/[id]" ? (
                            <>
                                <button onClick={() => updateCart(productId, quantity, "-", maxCount)}>
                                    <MinusIcon />
                                </button>
                                <span>{quantity}</span>
                                <button onClick={() => updateCart(productId, quantity, "+", maxCount)}>
                                    <PlusIcon />
                                </button>
                            </>
                        ) : (<span>{quantity}</span>)
                    }
                </div>
            </div>
            <p className="total-price">{quantity * price} ₽</p>
            {
                pathname !== "/checkout" && pathname !== "/orderSingle/[id]" ?
                <button className="remove-btn" onClick={() => removeProduct(productId)}>
                    <RemoveIcon />
                </button> : ""
            }
        </div>
    )
}

export default BasketItem