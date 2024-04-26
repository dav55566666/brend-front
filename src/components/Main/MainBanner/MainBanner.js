"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { selectBanners } from '../../../store/slices/banners/bannersSlice';
import { fetchBannerSlides } from '../../../store/slices/banners/bannersApi';
import { selectProducts } from '../../../store/slices/products/productsSlice';

function MainBanner() {
  const [getBanners, setGetBanners] = useState(false)
  const {bannerSlidesData} = useSelector(selectBanners)
  const {topProductsData} = useSelector(selectProducts)
  const dispatch = useDispatch()
  useEffect(() => {
    if(bannerSlidesData.length) {
      return setGetBanners(true)
    }
    if(!getBanners) {
      dispatch(fetchBannerSlides())
      setGetBanners(false)
    }
  }, [bannerSlidesData])
  return (
    <div className="main__banner" style={{maxWidth: topProductsData.length < 1 ? "100%" : ""}}>
      <Swiper >
        {
          bannerSlidesData?.map(banner => (
            <SwiperSlide key={banner.id}>
              <img src={"https://back.brend-instrument.ru" + banner.image} alt="banner" />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default MainBanner