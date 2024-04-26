"use client"
import React, { useEffect, useState } from 'react'
import BasketItem from '../BasketItem/BasketItem'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsers } from '../../store/slices/users/usersSlice'
import { fetchOrderSingle } from '../../store/slices/users/usersApi'
import Brendcrumbs from '../Brendcrumbs/Brendcrumbs'

function OrderSingle({ id }) {
    const [getOrder, setGetOrder] = useState(false)
    const dispatch = useDispatch()
    const { orderSingleData, loginData } = useSelector(selectUsers)
    useEffect(() => {
        if (!orderSingleData.id) {
            if (!getOrder) {
                dispatch(fetchOrderSingle({ userToken: loginData.access_token, orderId: id * 1 }))
            }
        }
    }, [orderSingleData])
    function formatDateTime(dateTimeString) {
        const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        const date = new Date(dateTimeString);
        return date.toLocaleDateString('ru-RU', options);
    }
    return (
        <>
            {
                orderSingleData.id ?
                    <>
                        <Brendcrumbs title={`#${orderSingleData.id}`} links={[{name: "Мои заказы", link: "/orders"}]} />
                        <section className="order-single">
                            <div className="order-single__container _container">
                                <h1>Заказ № #{orderSingleData.id}</h1>
                                <div className="basket__products">
                                    <div className="basket__products-title">
                                        <p>№</p>
                                        <p>Фото</p>
                                        <p>Наименование</p>
                                        <p>Цена</p>
                                        <p>Количество</p>
                                        <p>Сумма</p>
                                    </div>
                                    {
                                        orderSingleData?.products?.map((el, idx) => (
                                            <BasketItem key={el.item.id} removeBtn={false} image={el.item.image} price={el.item.price} quantity={el.item.quantity} number={idx} name={el.item.name} productId={el.item.id} />
                                        ))
                                    }
                                </div>
                                <div className="order-single__total">
                                    {/* <p>Сумма:
                                        <span>{orderSingleData.total} ₽</span>
                                    </p>
                                    <span className="symbol">
                                        <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect y={9} width={21} height={3} rx="1.5" fill="#3F3F3F" />
                                            <rect x={12} width={21} height={3} rx="1.5" transform="rotate(90 12 0)" fill="#3F3F3F" />
                                        </svg>
                                    </span>
                                    <p>Доставка:
                                        <span>{orderSingleData.delivery} ₽</span>
                                    </p>
                                    <span className="symbol">
                                        <svg width={29} height={17} viewBox="0 0 29 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 2H27" stroke="#3F3F3F" strokeWidth={3} strokeLinecap="round" />
                                            <path d="M2 15H27" stroke="#3F3F3F" strokeWidth={3} strokeLinecap="round" />
                                        </svg>
                                    </span> */}
                                    <p>Общая сумма:
                                        <span>{orderSingleData.grant_total} ₽</span>
                                    </p>
                                </div>
                                <div className="order-single__characteristics">
                                    <p>Способ доставки:<span>Доставка курьером</span></p>
                                    <p>Способ оплаты:<span>Наличными при получении</span></p>
                                    <p>Дата заказа:<span>{formatDateTime(orderSingleData.created_at)}</span></p>
                                    <p>Статус:<span>{orderSingleData.status === "1" ? "В обработке" : orderSingleData.status === "2" ? "Забронирован" : "Доставлен"}</span></p>
                                    <p>Телефон получателя:<span>{orderSingleData.user.phone}</span></p>
                                    <p>Адрес:<span>{orderSingleData.address.address_1}</span></p>
                                    <p>Дата и время доставки:<span>Март 12, 2023, 13:20</span></p>
                                    <p className="comments">Примечания<span>{orderSingleData.note}</span></p>
                                </div>
                            </div>
                        </section>
                    </>
                    : ""
            }
        </>

    )
}

export default OrderSingle