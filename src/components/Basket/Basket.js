"use client";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, toglleTotalPrice } from "../../store/slices/cart/cartSlice"
import { fetchCart } from '../../store/slices/cart/cartApi';
import { selectUsers } from '../../store/slices/users/usersSlice';
import { DubbleArrowLeftIcon, DubbleArrowRightIcon, MinusIcon, PlusIcon, RemoveIcon } from '../../svg';
import BasketItem from "../BasketItem/BasketItem"
import Link from 'next/link';
import Loader from '../Loader/Loader';
import { preOrder } from '../../store/slices/products/productsSlice';
import BasketTable from '../BasketTable/BasketTable';

function Basket() {
    const { cartData, guestUserId } = useSelector(selectCart)
    const { loginData } = useSelector(selectUsers)
    const [getCart, setGetCart] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch()
    const togglePrice = () => {
        if(cartData.length) {
            const sum = cartData.reduce((acc, product) => {
                return acc + (product.price * product.quantity);
            }, 0);
            setTotalPrice(sum)
            dispatch(toglleTotalPrice({sum}))
        }
    }
    useEffect(() => {
        if (!getCart) {
            dispatch(fetchCart({ userToken: loginData.access_token, guestUserId }))
            setGetCart(true)
        }
        togglePrice()
    }, [getCart, cartData,totalPrice])
    return (
        <>
            <section className="basket">
                <div className="basket__container _container">
                    <h1>Ваша корзина</h1>
                    {cartData.length ?
                        <>
                            <BasketTable />
                            <div className="basket__total">
                                <p>Общая сумма:
                                    <span>{totalPrice} ₽</span>
                                </p>
                            </div>
                            <div className="basket__buttons">
                                <a href="#">
                                    <DubbleArrowLeftIcon />
                                    Вернуться в магазин
                                </a>
                                <Link href={"/checkout"} onClick={() => {togglePrice(), dispatch(preOrder({toggle: false}))}}>
                                    Оформить заказ
                                    <DubbleArrowRightIcon />
                                </Link>
                            </div>
                        </> :
                        <div className='basket__empty'>
                            <p>Ваша корзина пуста</p>
                            <Link href={"/"}> <DubbleArrowLeftIcon /> Продолжить покупки</Link>
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

export default Basket