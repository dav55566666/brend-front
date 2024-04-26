import React from 'react'
import Swiper from 'swiper'

function Comparison() {
    return (
        <section className="comparison">
            <div className="comparison__container _container">
                <h1>Сравнение товаров</h1>
                <div className="comparison__product">
                    <h2>Автооборудование (2)</h2>
                    <div className="comparison__product-buttons">
                        <button>
                            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#5A6672" />
                            </svg>
                            Удалить список
                        </button>
                        <label className="checkbox">
                            <input type="checkbox"/>
                            <span>
                                <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width={22} height={22} rx={5} fill="#1E91CF" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.6751 7.07257C14.8702 6.87915 15.1336 6.77029 15.4084 6.76954C15.6831 6.76878 15.9471 6.87618 16.1433 7.06852C16.3395 7.26086 16.4521 7.52269 16.4568 7.79739C16.4615 8.0721 16.3579 8.33761 16.1683 8.53652L10.6025 15.4938C10.5069 15.5968 10.3914 15.6795 10.2631 15.7369C10.1347 15.7943 9.99614 15.8252 9.85557 15.8278C9.715 15.8304 9.57535 15.8046 9.44497 15.752C9.31459 15.6994 9.19616 15.6211 9.09675 15.5217L5.40899 11.8325C5.30625 11.7368 5.22385 11.6213 5.1667 11.4931C5.10954 11.3648 5.07881 11.2263 5.07633 11.0859C5.07386 10.9455 5.09969 10.8061 5.15228 10.6758C5.20487 10.5456 5.28315 10.4274 5.38244 10.3281C5.48174 10.2288 5.60002 10.1505 5.73022 10.0979C5.86043 10.0453 5.99989 10.0195 6.1403 10.022C6.2807 10.0244 6.41917 10.0552 6.54744 10.1123C6.67571 10.1695 6.79115 10.2519 6.88688 10.3546L9.80642 13.2728L14.6486 7.10324C14.6573 7.09244 14.6666 7.0822 14.6765 7.07257H14.6751Z" fill="white" />
                                </svg>
                            </span>
                            <p>Показывать только отличия</p>
                        </label>
                    </div>
                    <div className="comparison__product-flex">
                        <div className="comparison__product-left">
                            <p>Модель</p>
                            <p>Цена</p>
                        </div>
                        <div className="comparison__product-swiper">
                            <div className="swiper">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide"></div>
                                    <div className="swiper-slide"></div>
                                    <div className="swiper-slide"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comparison__characteristics">
                    <button className="toggle-btn">
                        Дополнительные характеристики
                        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.0599 13.2434C13.9828 13.3206 13.8912 13.3819 13.7904 13.4237C13.6896 13.4655 13.5815 13.4871 13.4724 13.4871C13.3632 13.4871 13.2552 13.4655 13.1544 13.4237C13.0536 13.3819 12.962 13.3206 12.8849 13.2434L9.65155 10.01L6.41822 13.2434C6.2624 13.3992 6.05108 13.4867 5.83072 13.4867C5.61037 13.4867 5.39903 13.3992 5.24322 13.2434C5.0874 13.0875 4.99987 12.8762 4.99987 12.6559C4.99987 12.4355 5.0874 12.2242 5.24322 12.0684L9.06822 8.24336C9.14531 8.1661 9.23689 8.10481 9.3377 8.063C9.43851 8.02118 9.54658 7.99965 9.65572 7.99965C9.76486 7.99965 9.87293 8.02118 9.97374 8.063C10.0746 8.10481 10.1661 8.1661 10.2432 8.24336L14.0682 12.0684C14.3849 12.385 14.3849 12.9184 14.0599 13.2434Z" fill="#333333" />
                        </svg>
                    </button>
                    <div className="comparison__characteristics-flex">
                        <div className="comparison__characteristics-left">
                            <p>Бренд</p>
                            <p>Модель</p>
                            <p>Потребляемая мощность</p>
                            <p>Число оборотов</p>
                            <p>Аккумулятор</p>
                            <p />
                            <p>Особенности</p>
                        </div>
                        <div className="comparison__characteristics-swiper">
                            <div className="swiper">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <p>MAKITA</p>
                                        <p>5008 MG</p>
                                        <p>1800 Вт</p>
                                        <p>5200 об/мин</p>
                                        <p>-</p>
                                        <p>-</p>
                                    </div>
                                    <div className="swiper-slide">
                                        <p>HIPER</p>
                                        <p>HCS800A</p>
                                        <p>-</p>
                                        <p>5200 об/мин</p>
                                        <p>-</p>
                                        <p>Компактная и легкая пила идеально подойдет для нарезки ламината, ДСП и прочих материалов. Двигатель 800 Вт позволяет с легкостью делать пропилы глубиной до 45 мм. Глубину и угол пропила можно регулировать для аккуратной и точной работы. Выход под пылесос позволит соблюдать чистоту на рабочем месте.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Comparison