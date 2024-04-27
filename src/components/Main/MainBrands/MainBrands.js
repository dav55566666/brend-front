"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBrands } from '../../../store/slices/brands/brandsSlice'
import { fetchBrands } from '../../../store/slices/brands/brandsApi'
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link'

function MainBrands() {

  const [getBrands, setGetBrands] = useState(false)
  const { brandsData } = useSelector(selectBrands)
  const dispatch = useDispatch()

  useEffect(() => {
    if(brandsData.lengt) {
      return setGetBrands(true)
    }
    if (!getBrands) {
      dispatch(fetchBrands())
      setGetBrands(true)
    }
  }, [brandsData])

  return (
    <div className="main__brands">
      <Swiper className='main__brands-swiper' spaceBetween={16} slidesPerView={"auto"}>
        {
          brandsData?.map(brend => (
            <SwiperSlide key={brend.id}>
              <Link href={`/brandSingle/${brend.slug}`}>{brend.title}</Link>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Link href="/brands" className="showmore">
        <span>Еще</span>
      </Link>
    </div>
  )
}

export default MainBrands