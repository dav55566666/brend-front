"use client";
import { useDispatch, useSelector } from "react-redux"
import CategoryItem from "../CategoryItem/CategoryItem";
import { useEffect, useRef, useState, useCallback } from "react";
import { selectCategory } from "../../store/slices/category/categorySlice";
import { fetchCategory, fetchTopCategory } from "../../store/slices/category/categoryApi";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArrowNext, ArrowPrev } from "../../svg";
import Link from "next/link";


const TopCategory = () => {
  const dispatch = useDispatch()
  const { topCategoryData } = useSelector(selectCategory)
  const [getTopGategory, setGetTopGategory] = useState(false)
  const topCategorySwiperRef = useRef(null)

  useEffect(() => {
    if(topCategoryData.length) {
      return setGetTopGategory(true)
    }
    if (!getTopGategory) {
      dispatch(fetchTopCategory({limit: 20}))
      setGetTopGategory(true)
    }
  }, [topCategoryData])
  const prevSlide = useCallback(() => {
    topCategorySwiperRef.current?.swiper.slidePrev();
  }, [topCategorySwiperRef]);

  const nextSlide = useCallback(() => {
    topCategorySwiperRef.current?.swiper.slideNext();
  }, [topCategorySwiperRef]);
  return (
    <section className="top-category">
      <div className="top-category__container _container">
        <div className="section-title">
          <h2>Популярные категории</h2>
          <Link href="/category">Смотреть все</Link>
        </div>
        <div className="top-category__flex">
          <div className="top-category__img"><img src={"https://brend-instrument.ru/img/Rectangle 149940.png"} alt={"aa"} /></div>
          <div className="top-category__swiper">
            <button className="slideprev" onClick={() => prevSlide()}>
              <ArrowPrev />
            </button>
            <button className="slidenext" onClick={() => nextSlide()}>
              <ArrowNext />
            </button>
            <Swiper slidesPerView={'auto'} loop={true} ref={topCategorySwiperRef} className="swiper">
              {
                topCategoryData.map(el => (
                  <SwiperSlide key={el.id} className="swiper-slide"><CategoryItem title={el.title} img={"https://back.brend-instrument.ru/" + el.image} id={el.id} slug={el.slug} /></SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        </div>
      </div>
    </section>

  )
}

export default TopCategory