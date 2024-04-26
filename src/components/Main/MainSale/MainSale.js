"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowNext, ArrowPrev, InfoIcon } from '../../../svg'
import { Swiper, SwiperSlide } from 'swiper/react';
import Timer from '../../Timer/Timer';
import ProductItem from '../../ProductItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '../../../store/slices/products/productsSlice';
import { fetchTopProducts } from '../../../store/slices/products/productsApi';

function MainSale() {
  const swiperRef = useRef(null)
  const dispatch = useDispatch()
  const { topProductsData } = useSelector(selectProducts)
  const [getTopProducts, setGetTopProducts] = useState(false)

  useEffect(() => {
    if (topProductsData.length) {
      return setGetTopProducts(true)
    }
    if (!getTopProducts) {
      dispatch(fetchTopProducts({ limit: 10 }))
      setGetTopProducts(true)
    }
  }, [topProductsData])

  const slideNext = useCallback(() => {
    swiperRef.current?.swiper.slideNext();
  }, [swiperRef]);

  const slidePrev = useCallback(() => {
    swiperRef.current?.swiper.slidePrev();
  }, [swiperRef]);

  return (
    <>
      {
        topProductsData.length ? <div className="main__sale">
          <div className="main__slae-swiper">
            {
              topProductsData.length > 1 && (
                <>
                  <button className="slideprev" onClick={() => slidePrev()}>
                    <ArrowPrev />
                  </button>
                  <button className="slidenext" onClick={() => slideNext()}>
                    <ArrowNext />
                  </button>
                </>
              )
            }
            <Swiper ref={swiperRef}>
              {
                topProductsData?.map(el => (
                  <SwiperSlide key={el.id}>
                    <div className="main__sale-title">
                      <h4>
                        Успейте купить
                        <InfoIcon color={"#5A6672"} />
                      </h4>
                      <Timer endDate={new Date(el.end)} />
                    </div>
                    <ProductItem title={el?.title && el.title} img={"https://back.brend-instrument.ru" + el?.image} price={el?.price} salePrice={el?.special_price === 0 ? false : el?.special_price} id={el?.id} slug={el.slug} />
                  </SwiperSlide>
                ))
              }
            </Swiper>
            <div className="main__sale-pagination swiper-pagination" />
          </div>
        </div> : ""
      }
    </>
  )
}

export default MainSale