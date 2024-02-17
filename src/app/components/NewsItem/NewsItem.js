import Image from 'next/image'
import React from 'react'

function NewsItem() {
    return (
        <div className="news-item">
            <a href className="news-item__img">
                <img src="/img/image 5 (1).png" alt="#" />
            </a>
            <div className="news-item__text">
                <span>26 ноября 2023 </span>
                <h4><a href="#">Экономить-просто!  Купите все необходимое со скидкой!</a></h4>
            </div>
        </div>
    )
}

export default NewsItem