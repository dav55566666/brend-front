import Image from 'next/image'
import React from 'react'

function OrderSingle() {
    return (
        <section className="order-single">
            <div className="order-single__container _container">
                <h1>Заказ № #2568</h1>
                <div className="basket__products">
                    <div className="basket__products-title">
                        <p>№</p>
                        <p>Фото</p>
                        <p>Наименование</p>
                        <p>Цена</p>
                        <p>Количество</p>
                        <p>Сумма</p>
                    </div>
                    <div className="basket__item">
                        <p>1</p>
                        <div className="basket__item-img">
                            <Image src="/img/img.png" alt="img" />
                        </div>
                        <h4>название товара</h4>
                        <p className="price">7.600 ₽</p>
                        <div className="counter">
                            <div className="counter-flex">
                                <span>1</span>
                            </div>
                        </div>
                        <p className="total-price">7.600 ₽</p>
                    </div>
                </div>
                <div className="order-single__total">
                    <p>Сумма:
                        <span>7.600 ₽</span>
                    </p>
                    <span className="symbol">
                        <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y={9} width={21} height={3} rx="1.5" fill="#3F3F3F" />
                            <rect x={12} width={21} height={3} rx="1.5" transform="rotate(90 12 0)" fill="#3F3F3F" />
                        </svg>
                    </span>
                    <p>Доставка:
                        <span>150 ₽</span>
                    </p>
                    <span className="symbol">
                        <svg width={29} height={17} viewBox="0 0 29 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 2H27" stroke="#3F3F3F" strokeWidth={3} strokeLinecap="round" />
                            <path d="M2 15H27" stroke="#3F3F3F" strokeWidth={3} strokeLinecap="round" />
                        </svg>
                    </span>
                    <p>Общая сумма:
                        <span>7.750 ₽</span>
                    </p>
                </div>
                <div className="order-single__characteristics">
                    <p>Способ доставки:<span>Доставка курьером</span></p>
                    <p>Способ оплаты:<span>Наличными при получении</span></p>
                    <p>Дата заказа:<span>Март 11, 2023, 18:19</span></p>
                    <p>Статус:<span>Доставлено</span></p>
                    <p>Номер телефона:<span>+791 502 31111</span></p>
                    <p>Телефон получателя:<span>+791 502 31111</span></p>
                    <p>Адрес:<span>Тверская улица, дом 13</span></p>
                    <p>Дата и время доставки:<span>Март 12, 2023, 13:20</span></p>
                    <p className="comments">Примечания<span>-</span></p>
                </div>
            </div>
        </section>

    )
}

export default OrderSingle