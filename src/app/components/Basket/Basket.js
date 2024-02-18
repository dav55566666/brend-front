"use client";
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from "../../store/slices/cart/cartSlice"
import { fetchCart } from '../../store/slices/cart/cartApi';
import { selectUsers } from '../../store/slices/users/usersSlice';
import { DubbleArrowLeftIcon, DubbleArrowRightIcon, MinusIcon, PlusIcon, RemoveIcon } from '../../svg';

function Basket() {
    const {cartData} = useSelector(selectCart)
    const {loginData} = useSelector(selectUsers)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(cartData);
        dispatch(fetchCart({userToken: loginData.access_token}))
    }, [cartData])
    return (
        <section className="basket">
            <div className="basket__container _container">
                <h1>Ваша корзина</h1>
                <div className="basket__products">
                    <div className="basket__products-title">
                        <p>№</p>
                        <p>Фото</p>
                        <p>Наименование</p>
                        <p>Цена</p>
                        <p>Количество</p>
                        <p>Сумма</p>
                        <p>удалить</p>
                    </div>
                    {
                        cartData?.map((el, idx) => (
                            <div className="basket__item" key={el.id}>
                                <p>{idx}</p>
                                <div className="basket__item-img">
                                    <img src={el.image} alt='img' />
                                </div>
                                <h4>{el.title}</h4>
                                <p className="price">{el.price} ₽</p>
                                <div className="counter">
                                    <div className="counter-flex">
                                        <button>
                                            <MinusIcon />
                                        </button>
                                        <span>1</span>
                                        <button>
                                            <PlusIcon />
                                        </button>
                                    </div>
                                </div>
                                <p className="total-price">{el.price * (quantity * 1)} ₽</p>
                                <button className="remove-btn">
                                    <RemoveIcon />
                                </button>
                            </div>
                        ))
                    }
                </div>
                <div className="basket__total">
                    <p>Общая сумма:
                        <span>24.500 ₽</span>
                    </p>
                </div>
                <div className="basket__buttons">
                    <a href>
                        <DubbleArrowLeftIcon />
                        Вернуться в магазин
                    </a>
                    <a href>
                        Оформить заказ
                        <DubbleArrowRightIcon />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Basket