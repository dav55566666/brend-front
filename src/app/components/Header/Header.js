"use client";
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowDown, BasketIcon, BurgerIcon, ComprasionIcon, InfoIcon, LikeIcon, LocateIcon, MoreIcon, PhoneIcon, SearchIcon, UserIcon } from '../../svg'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../store/slices/users/usersSlice';
import axios from 'axios';
import { selectCategory } from '../../store/slices/category/categorySlice';
import { fetchCategory } from '../../store/slices/category/categoryApi';

function Header() {
    const dispatch = useDispatch()

    const [abautLinksToggle, setAbautLinksToggle] = useState(false)

    const [infoLinksToggle, setInfoLinksToggle] = useState(false)

    const [toggleCatalog, setToggleCatalog] = useState(false)

    const { usersData } = useSelector(selectUsers)

    const { categoryData } = useSelector(selectCategory)

    const searchRef = useRef(null)

    useEffect(() => {console.log(usersData);}, [usersData])

    useEffect(() => {
        if (!categoryData.length) {
            dispatch(fetchCategory())
        }
    }, [])

    const searchSubmit = () => {

    }

    return (
        <header className="header">
            <div className="header__top">
                <div className="header__container _container">
                    <div className="header__nav">
                        <div className="header__dropdown">
                            <div className="header__dropdown-title" onClick={() => { setAbautLinksToggle(!abautLinksToggle); setInfoLinksToggle(false); setToggleCatalog(false) }}>
                                <span>О компании</span>
                                <ArrowDown active={abautLinksToggle} color={"#3B3B3B"} />
                            </div>
                            {
                                abautLinksToggle &&
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
                            <div className="header__dropdown-title" onClick={() => { setInfoLinksToggle(!infoLinksToggle); setAbautLinksToggle(false); setToggleCatalog(false) }}>
                                <InfoIcon color={"#D70000"} />
                                <span>Информация</span>
                                <ArrowDown active={infoLinksToggle} color={"#D70000"} />
                            </div>
                            {
                                infoLinksToggle &&
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
                        <button className="catalog-btn" onClick={() => {
                            setToggleCatalog(!toggleCatalog)
                            setAbautLinksToggle(false)
                            setInfoLinksToggle(false)
                        }}>
                            <BurgerIcon />
                            Каталог
                        </button>
                        {
                            toggleCatalog && (
                                <div className='hide-catalog'>
                                    <ul className='hide-catalog__grid'>
                                        {
                                            categoryData?.map(category => (
                                                <li key={category.id}>
                                                    <Link href={{ pathname: `/category/categorySingl`, query: { categoryId: category.id } }} className='category-title' onClick={() => setToggleCatalog(false)}>{category.title}</Link>
                                                    <ul>
                                                        {
                                                            category.children?.map(el => (
                                                                <li key={el.id}>
                                                                    <Link href={{ pathname: `/category/categorySingl`, query: { categoryId: el.id } }} onClick={() => setToggleCatalog(false)}>{el.title}</Link>
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
                        <form ref={searchRef} onSubmit={() => searchSubmit()}>
                            <label htmlFor={'asd'} className="input-text" >
                                <input type="text" placeholder="Поиск по товарам..." onInput={() => {
                                    let send = 0
                                    const sendForm = setTimeout(() => {
                                        send = 1
                                    }, 2000)
                                    if(send === 1) {
                                        send = 0
                                        console.log("send");
                                        clearInterval(sendForm)
                                        return
                                    }
                                }} />
                            </label>
                            <label htmlFor={'asd'} className="input-btn">
                                <SearchIcon />
                                <input type="submit" defaultValue={'asd'} />
                            </label>
                        </form>
                    </div>
                    <div className="header__user">
                        <Link href={usersData.name ? "/liked/" : "/login/"}>
                            <LikeIcon />
                            Избранное
                            <span>0</span>
                        </Link>
                        <Link href="basket.html">
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