"use client";
import { useDispatch, useSelector } from "react-redux"
import CategoryItem from "../CategoryItem/CategoryItem";
import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import { selectCategory } from "../../store/slices/category/categorySlice";
import { fetchTopCategory } from "../../store/slices/category/categoryApi";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArrowNext, ArrowPrev } from "../../svg";


const TopCategory = () => {
  const dispatch = useDispatch()
  const { topCategoryData } = useSelector(selectCategory)
  const topCategorySwiperRef = useRef(null)

  useLayoutEffect(() => {
    if (!topCategoryData.length) {
      dispatch(fetchTopCategory({limit: 20}))
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
          <a href="/">Смотреть все</a>
        </div>
        <div className="top-category__flex">
          <div className="top-category__img"><img src={"/img/Rectangle 149940.png"} alt={"aa"} /></div>
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
                  <SwiperSlide key={el.id} className="swiper-slide"><CategoryItem title={el.title} img={el.image} id={el.id} /></SwiperSlide>
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