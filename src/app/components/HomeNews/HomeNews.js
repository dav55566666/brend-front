import React from 'react'
import NewsItem from '../NewsItem/NewsItem'

function HomeNews() {
    return (
        <section className="home-news">
            <div className="home-news__container _container">
                <div className="home-news__text">
                    <h2>Новости</h2>
                    <p>Предлагаем вам широкий ассортимент продукции.</p>
                    <a href='#'>
                        Все новости
                        <svg width={23} height={9} viewBox="0 0 23 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.3536 4.85355C22.5488 4.65829 22.5488 4.34171 22.3536 4.14645L19.1716 0.964466C18.9763 0.769204 18.6597 0.769204 18.4645 0.964466C18.2692 1.15973 18.2692 1.47631 18.4645 1.67157L21.2929 4.5L18.4645 7.32843C18.2692 7.52369 18.2692 7.84027 18.4645 8.03553C18.6597 8.2308 18.9763 8.2308 19.1716 8.03553L22.3536 4.85355ZM0 5H22V4H0V5Z" fill="#0C96D1" />
                        </svg>
                    </a>
                </div>
                <div className="home-news__right">
                    <NewsItem />
                    <NewsItem />
                    <NewsItem />
                </div>
            </div>
        </section>
    )
}

export default HomeNews