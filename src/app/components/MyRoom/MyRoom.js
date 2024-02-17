import React from 'react'
import MyRoomMenu from '../MyRoomMenu/MyRoomMenu'

function MyRoom() {
    return (
        <section className="myroom">
            <div className="myroom__container _container">
                <h1>Личный Кабинет</h1>
                <div className="myroom__flex">
                    <MyRoomMenu />
                    <div className="myroom__right">
                        <h2>Ваша учетная запись</h2>
                        <form >
                            <div className="myroom__grid">
                                <label className="input-text">Имя *<input type="text" className="input" placeholder="Иван" /></label>
                                <label className="input-text">Фамилия *<input type="text" className="input" placeholder="Иванов" /></label>
                                <label className="input-text">Отчество *<input type="text" className="input" placeholder="Иванович" /></label>
                                <label className="input-text">Эл. адрес *<input type="text" className="input" placeholder="ivan.ivanovich@gmail.com" /></label>
                                <label className="input-text">Телефон *<input type="text" className="input" placeholder="+791 502 31111" /></label>
                                <label className="input-text">Компания<input type="text" className="input" placeholder="TESTWEB" /></label>
                                <label className="input-text">Адрес 1 *<input type="text" className="input" placeholder="Адрес 1" /></label>
                                <label className="input-text">Адрес 2<input type="text" className="input" placeholder="Адрес 2" /></label>
                                <label className="input-text">Город *<input type="text" className="input" placeholder="Город" /></label>
                                <label className="input-text">Почтовый индекс *<input type="text" className="input" placeholder={125009} /></label>
                                <label className="input-text">Страна *<input type="text" className="input" placeholder="Российская Федерация" /></label>
                                <label className="input-text">Регион / Область *<input type="text" className="input" placeholder="Алтайский край" /></label>
                                <label className="input-text">Последний визит<input type="text" className="input" placeholder="03-10-2023 16:30" /></label>
                                <label className="input-text">Дата регистрации<input type="text" className="input" placeholder="14-07-2020 11:30" /></label>
                            </div>
                            <label className="input-btn">
                                <button className="input">
                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.3764 20.0279L18.1628 8.66544C18.6403 8.0527 18.8101 7.3443 18.6509 6.62299C18.513 5.96726 18.1097 5.34377 17.5049 4.87078L16.0299 3.69906C14.7459 2.67784 13.1541 2.78534 12.2415 3.95706L11.2546 5.23735C11.1273 5.39752 11.1591 5.63401 11.3183 5.76301C11.3183 5.76301 13.812 7.76246 13.8651 7.80546C14.0349 7.96671 14.1622 8.1817 14.1941 8.43969C14.2471 8.94493 13.8969 9.41792 13.377 9.48242C13.1329 9.51467 12.8994 9.43942 12.7297 9.29967L10.1086 7.21422C9.98126 7.11855 9.79025 7.13898 9.68413 7.26797L3.45514 15.3303C3.0519 15.8355 2.91395 16.4912 3.0519 17.1255L3.84777 20.5761C3.89021 20.7589 4.04939 20.8879 4.24039 20.8879L7.74222 20.8449C8.37891 20.8341 8.97316 20.5439 9.3764 20.0279ZM14.2797 18.9533H19.9898C20.5469 18.9533 21 19.4123 21 19.9766C21 20.5421 20.5469 21 19.9898 21H14.2797C13.7226 21 13.2695 20.5421 13.2695 19.9766C13.2695 19.4123 13.7226 18.9533 14.2797 18.9533Z" fill="white" />
                                    </svg>
                                    Изменить мою информацию
                                </button>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default MyRoom