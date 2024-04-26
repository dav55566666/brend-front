"use client";
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearch } from "../../../store/slices/search/searchApi"
import { selectSearch } from '../../../store/slices/search/searchSlice';
import { fetchSingleProduct } from "../../../store/slices/products/productsApi"
import { SearchIcon } from '../../../svg';
import Link from 'next/link';
import Image from 'next/image';

function HeaderSearch({ headerToggles, headerToggleClick, mobileSearch, setMobileSearch }) {

  const dispatch = useDispatch()
  const { searchProductsData } = useSelector(selectSearch)
  const searchRef = useRef(null)

  const searchSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchSearch({ value: searchRef.current[0].value }))
    headerToggleClick(headerToggles ? null : "searchToggle")
    if (!searchRef.current[0].value.split("").length) {
      headerToggleClick(null)
    }
  }

  useEffect(() => { console.log(typeof window !== 'undefined' && window.innerWidth);}, [searchProductsData])

  const productLinkClick = (slug) => {
    dispatch(fetchSingleProduct({ slug: slug }))
    headerToggleClick(false)
  }

  return (
    <div className="header__search" style={{display: typeof window !== 'undefined' ? window.innerWidth < 1024 && mobileSearch ? "block" : "none" : ""}}>
      <form ref={searchRef} onSubmit={searchSubmit}>
        <label htmlFor={'asd'} className="input-text" >
          <input type="text" placeholder="Поиск по товарам..." onFocus={(e) => {
            headerToggleClick(headerToggles ? null : "searchToggle")
            if (!e.target.value.split("").length) {
              headerToggleClick(null)
            }
          }} onInput={(e) => {
            searchSubmit(e)
            headerToggleClick(headerToggles ? null : "searchToggle")
            if (!e.target.value.split("").length) {
              headerToggleClick(null)
            }
          }} />
        </label>
        <label htmlFor={'asd'} className="input-btn">
          <SearchIcon />
          <input type="submit" defaultValue={'asd'} />
        </label>
      </form>
      {
        headerToggles === "searchToggle" &&
        <div className='header__search-result'>
          <div className='header__search-scroll'>
            {
              searchProductsData?.map(el => (
                <div key={el.id} className='header__search-item'>
                  <Link href={`/product/${el.slug}`} className='img' onClick={() => productLinkClick(el.slug)}>
                    <Image src={"https://back.brend-instrument.ru/" + el.image} alt={el.title} width={60} height={60} />
                  </Link>
                  <h4>
                    <Link href={`/product/${el.slug}`} onClick={() => {productLinkClick(el.slug); setMobileSearch(false)}}>{el.title}</Link>
                  </h4>
                </div>
              ))
            }
          </div>
        </div>
      }
    </div>
  )
}

export default HeaderSearch