"use client";
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowDown, BasketIcon, BurgerIcon, ComprasionIcon, InfoIcon, LikeIcon, LocateIcon, MoreIcon, PhoneIcon, SearchIcon, UserIcon } from '../../svg'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../store/slices/users/usersSlice';
import { selectCategory } from '../../store/slices/category/categorySlice';
import { fetchCategory } from '../../store/slices/category/categoryApi';
import { fetchSearch } from "../../store/slices/search/searchApi"
import { selectSearch } from '../../store/slices/search/searchSlice';

function Header() {
    const dispatch = useDispatch()

    const { usersData } = useSelector(selectUsers)

    const { categoryData } = useSelector(selectCategory)

    const { searchProductsData } = useSelector(selectSearch)

    const searchRef = useRef(null)

    const [headerToggles, setHeaderToggles] = useState(null)

    useEffect(() => {}, [usersData])

    useEffect(() => {}, [searchProductsData])

    useEffect(() => {
        if (!categoryData.length) {
            dispatch(fetchCategory())
        }
    }, [])

    const headerToggleClick = (value) => {
        setHeaderToggles(value)
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchSearch({value: searchRef.current[0].value}))
    }

    return (
        <header className="header">
            <div className="header__top">
                <div className="header__container _container">
                    <div className="header__nav">
                        <div className="header__dropdown">
                            <div className="header__dropdown-title" onClick={() => headerToggleClick(headerToggles ? null : "abautLinks")}>
                                <span>О компании</span>
                                <ArrowDown active={headerToggles === "abautLinks" ? true : false} color={"#3B3B3B"} />
                            </div>
                            {
                                headerToggles === "abautLinks" &&
                                <div className="header__dropdown-hide">
                                    <ul>
                                        <li><Link href="/">История компании</Link></li>
                                        <li><Link href="/">Отзывы</Link></li>
                                        <li><Link href="/">Новости </Link></li>
                                        <li><Link href="/">Вакансии</Link></li>
                                        <li><Link href="/">Реквизиты</Link></li>
                                    </ul>
                                </div>
                            }
                        </div>
                        <div className="header__dropdown info-dropdown">
                            <div className="header__dropdown-title" onClick={() => headerToggleClick(headerToggles ? null : "infoLinks")}>
                                <InfoIcon color={"#D70000"} />
                                <span>Информация</span>
                                <ArrowDown active={headerToggles === "infoLinks" ? true : false} color={"#D70000"} />
                            </div>
                            {
                                headerToggles === "infoLinks" &&
                                <div className="header__dropdown-hide">
                                    <ul>
                                        <li><Link href="/">Скупка/продажа</Link></li>
                                        <li><Link href="/">Продавцам</Link></li>
                                        <li><Link href="/">Покупателям</Link></li>
                                        <li><Link href="/">Условия сотрудничества</Link></li>
                                        <li><Link href="/">Юридическим лицам</Link></li>
                                    </ul>
                                </div>
                            }
                        </div>
                        <ul className="menu">
                            <li><Link href="/category">Каталог</Link></li>
                            <li><Link href="/">Доставка и оплата</Link></li>
                            <li><Link href="/">Акции <span className="total">210</span></Link></li>
                        </ul>
                    </div>
                    <div className="header__contacts">
                        <Link href="/">
                            <LocateIcon /> Рязанский проспект 30/2
                        </Link>
                        <Link href="/">
                            <PhoneIcon /> 8 (800) 550 78 85
                        </Link>
                        <button>
                            <MoreIcon />
                        </button>
                    </div>
                </div>
            </div>
            <div className="header__bottom">
                <div className="header__container _container">
                    <div className="header__left">
                        <Link href="/" className="logo"><Image src="/img/logo.svg" alt={'asd'} width={172} height={70} /></Link>
                        <button className="catalog-btn" onClick={() => headerToggleClick(headerToggles ? null : "catalogLinks")}>
                            <BurgerIcon />
                            Каталог
                        </button>
                        {
                            headerToggles === "catalogLinks" && (
                                <div className='hide-catalog'>
                                    <ul className='hide-catalog__grid'>
                                        {
                                            categoryData?.map(category => (
                                                <li key={category.id}>
                                                    <Link href={{ pathname: `/category/categorySingl`, query: { categoryId: category.id } }} className='category-title' onClick={() => headerToggleClick(false)}>{category.title}</Link>
                                                    <ul>
                                                        {
                                                            category.children?.map(el => (
                                                                <li key={el.id}>
                                                                    <Link href={{ pathname: `/category/categorySingl`, query: { categoryId: el.id } }} onClick={() => headerToggleClick(false)}>{el.title}</Link>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                    <div className="header__search">
                        <form ref={searchRef} onSubmit={searchSubmit}>
                            <label htmlFor={'asd'} className="input-text" >
                                <input type="text" placeholder="Поиск по товарам..." onFocus={(e) => {
                                    headerToggleClick(headerToggles ? null : "searchToggle")
                                    if(!e.target.value.split("").length) {
                                        headerToggleClick(null)
                                    }
                                } } onInput={(e) => {
                                    searchSubmit(e)
                                    headerToggleClick(headerToggles ? null : "searchToggle")
                                    if(!e.target.value.split("").length) {
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
                                                <Link href={{pathname: `/product`, query: {productId: el.id}}} className='img' onClick={() => headerToggleClick(false)}>
                                                    <img src={el.image} alt={el.title} />
                                                </Link>
                                                <h4>
                                                    <Link href={{pathname: `/product`, query: {productId: el.id}}} onClick={() => headerToggleClick(false)}>{el.title}</Link>
                                                </h4>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className="header__user">
                        <Link href={usersData.name ? "/liked/" : "/login/"}>
                            <LikeIcon />
                            Избранное
                            <span>0</span>
                        </Link>
                        <Link href={usersData.name ? "/basket/" : "/login/"}>
                            <BasketIcon />
                            Корзина
                            <span>0</span>
                        </Link>
                        <Link href="comparison.html">
                            <ComprasionIcon />
                            Сравнение
                            <span>0</span>
                        </Link>
                        {
                            usersData?.name ?
                                <Link href={"/myroom"}>
                                    <UserIcon />
                                    {usersData.name}
                                </Link> :
                                <Link href="/login">
                                    <UserIcon />
                                    Войти
                                </Link>
                        }
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header