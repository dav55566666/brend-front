"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react'
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct } from '../../store/slices/products/productsApi';
import { counter, preOrder, selectProducts } from '../../store/slices/products/productsSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArrowNext, ArrowPrev, BronIcon, CheckIcon, LikeIcon, MinusIcon, PlusIcon, StockIcon } from '../../svg';
import Loader from '../Loader/Loader';
import { fetchAddToCart, fetchCart } from '../../store/slices/cart/cartApi';
import { selectUsers } from '../../store/slices/users/usersSlice';
import Link from 'next/link';
import ApplicationModal from "../ApplicationModal/ApplicationModal"
import { fetchLikedAdd } from '../../store/slices/liked/likedApi';
import { selectCart } from '../../store/slices/cart/cartSlice';
import { selectLiked } from '../../store/slices/liked/likedSlice';
import Brendcrumbs from '../Brendcrumbs/Brendcrumbs';
import { Thumbs } from 'swiper/modules';
import { useRouter } from 'next/router';
import SuccsesModal from '../SuccsesModal/SuccsesModal';


function ProductSingle({ slug }) {

    const swiperRef = useRef(null)

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [isLoading, setIsLoading] = useState(false)
    const [getProduct, setGetProduct] = useState(false)

    const [toggleInfo, setToggleInfo] = useState(true)

    const { loginData, usersData } = useSelector(selectUsers)

    const dispatch = useDispatch()

    const { singlProductData } = useSelector(selectProducts)

    const addRef = useRef(null);

    const [startAnim, setStartAnim] = useState(false);

    const [appModal, setAppModal] = useState(false)

    const { guestUserId, cartData } = useSelector(selectCart)

    const { uuId } = useSelector(selectLiked)

    const router = useRouter()

    useEffect(() => {
        if (singlProductData.id) {
            setIsLoading(true)
        }
        if (!getProduct) {
            setIsLoading(false)
            dispatch(fetchSingleProduct({ slug: slug }))
            setGetProduct(true)
        }
    }, [singlProductData, slug])


    const handleCounter = (type) => {
        if (type === "-" && singlProductData?.count > 1) {
            dispatch(counter({ type: "-" }))
        }
        if (type === "+" && singlProductData.quantity-1 >= singlProductData.count) {
            dispatch(counter({ type: "+" }))
        }
    }

    const addToCart = useCallback(() => {
        console.log(guestUserId);
        dispatch(fetchAddToCart({ productCount: singlProductData.count, productId: singlProductData.id, userToken: loginData.access_token ? loginData.access_token : null, guestUserId: guestUserId }));
        setStartAnim(true);
        setTimeout(() => {
            // dispatch(fetchCart({ userToken: loginData.access_token ? loginData.access_token : null, guestUserId: guestUserId }));
            setStartAnim(false);
        }, 1000);
    }, [guestUserId, loginData, cartData]);

    const addToWishList = useCallback(() => {
        dispatch(fetchLikedAdd({ userToken: loginData.access_token, productId: singlProductData.id, guestUserId: uuId }));
        setStartAnim(true);
        setTimeout(() => {
            setStartAnim(false);
        }, 1000);
    }, [guestUserId, loginData]);

    const slideNext = useCallback(() => {
        swiperRef.current?.swiper.slideNext();
    }, [swiperRef]);

    const slidePrev = useCallback(() => {
        swiperRef.current?.swiper.slidePrev();
    }, [swiperRef]);

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log(singlProductData);
    }, [router])

    const toggleModals = (value) => {
        setAppModal(value)
    }

    return (
        <>
            {
                isLoading ?
                    <>
                        <Brendcrumbs title={singlProductData?.title} links={[...singlProductData.categories.map(el => { return { name: el.name, link: `/categorySingl/${el.label}` } })]} />
                        <section className="product-single" >
                            <div className="product-single__container _container">
                                <h1>{singlProductData?.title}</h1>
                                <div className="produc-single__flex">
                                    <div className="product-single__img">
                                        {singlProductData.special_price > 0 && <div
                                            className="discount_div">- {(100 - (singlProductData.special_price * 100) / singlProductData.price)} %</div>}
                                        <Swiper className="produc-single__swiper"
                                            loop={true}
                                            spaceBetween={10}
                                            modules={[Thumbs]}
                                            ref={swiperRef}>
                                            <SwiperSlide >
                                                <img src={`https://back.brend-instrument.ru${singlProductData.image}`} alt="asd" />
                                            </SwiperSlide>
                                            {
                                                singlProductData?.images?.map(el => (
                                                    <SwiperSlide key={el.id}>
                                                        <img src={`https://back.brend-instrument.ru${el.path}`} alt="asd" />
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>
                                        <div className="produc-single__thumbs">
                                            <button className="slideprev" onClick={() => slidePrev()}>
                                                <ArrowPrev />
                                            </button>
                                            <Swiper
                                                modules={[Thumbs]}
                                                loop={true}
                                                spaceBetween={10}
                                                slidesPerView={4}
                                                freeMode={true}
                                                watchSlidesProgress={true}>
                                                <SwiperSlide >
                                                    <img src={`https://back.brend-instrument.ru${singlProductData.image}`} alt="asd" />
                                                </SwiperSlide>
                                                {
                                                    singlProductData?.images?.map(el => (
                                                        <SwiperSlide key={el.id}>
                                                            <img src={`https://back.brend-instrument.ru${el.path}`} alt="asd" />
                                                        </SwiperSlide>
                                                    ))
                                                }
                                            </Swiper>
                                            <button className="slidenext" onClick={() => slideNext()}>
                                                <ArrowNext />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="produc-single__text">
                                        <div className="produc-single__text-buy">
                                            <div className="prices">
                                                <p>{singlProductData?.special_price ? singlProductData.special_price : singlProductData.price} ₽</p>
                                                {
                                                    singlProductData?.special_price ?
                                                        <span>{singlProductData.price} ₽</span> : <></>
                                                }
                                            </div>
                                            <div className="counter">
                                                <p>Количество:</p>
                                                <div className="counter-flex">
                                                    <button onClick={() => handleCounter("-")}>
                                                        <MinusIcon />
                                                    </button>
                                                    <span>{singlProductData?.count}</span>
                                                    <button onClick={() => handleCounter("+")}>
                                                        <PlusIcon />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="product-types">
                                                <span>
                                                    <StockIcon />
                                                    В наличии
                                                </span>

                                                <p>Бренд:
                                                    <Link href={`/brandSingle/${singlProductData.brand_id.label}`}> {singlProductData?.brand_id.name}</Link>
                                                </p>
                                                <p>Состояние: {singlProductData?.attributes[0]?.value}

                                                </p>
                                            </div>
                                            <div className="product-buttons">
                                                <button onClick={() => addToCart()}>
                                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M19.6783 3.96567C19.5715 3.81254 19.3996 3.71789 19.2128 3.70991L7.63477 3.21085C7.30257 3.19631 7.02497 3.45278 7.01077 3.78343C6.99665 4.11395 7.2527 4.39323 7.58331 4.40743L18.3775 4.87274L16.2551 11.4947H6.81036L5.10402 2.20378C5.06651 2.00015 4.92671 1.83027 4.7339 1.75463L1.9392 0.656708C1.63119 0.536118 1.28363 0.687408 1.16266 0.995043C1.04191 1.30284 1.19315 1.65062 1.501 1.77159L3.98593 2.74779L5.72238 12.2018C5.77472 12.486 6.02241 12.6924 6.3115 12.6924H6.59955L5.9418 14.5194C5.88674 14.6724 5.90943 14.8424 6.00312 14.9754C6.09668 15.1084 6.24885 15.1875 6.41129 15.1875H6.87264C6.58676 15.5056 6.41129 15.9245 6.41129 16.3852C6.41129 17.3759 7.21741 18.1818 8.20789 18.1818C9.19838 18.1818 10.0045 17.3759 10.0045 16.3852C10.0045 15.9246 9.82902 15.5056 9.54319 15.1875H13.4602C13.1742 15.5056 12.9988 15.9245 12.9988 16.3852C12.9988 17.3759 13.8047 18.1818 14.7954 18.1818C15.7861 18.1818 16.592 17.3759 16.592 16.3852C16.592 15.9246 16.4166 15.5056 16.1308 15.1875H16.6918C16.9675 15.1875 17.1909 14.964 17.1909 14.6884C17.1909 14.4128 16.9675 14.1894 16.6918 14.1894H7.12138L7.66029 12.6922H16.6918C16.9522 12.6922 17.1827 12.524 17.262 12.2762L19.7573 4.49084C19.8146 4.31315 19.7852 4.11888 19.6783 3.96567ZM8.20794 17.1839C7.76756 17.1839 7.40942 16.8258 7.40942 16.3854C7.40942 15.945 7.76756 15.5869 8.20794 15.5869C8.64831 15.5869 9.00641 15.945 9.00641 16.3854C9.00641 16.8258 8.64831 17.1839 8.20794 17.1839ZM14.7954 17.1839C14.355 17.1839 13.9969 16.8258 13.9969 16.3854C13.9969 15.945 14.355 15.5869 14.7954 15.5869C15.2358 15.5869 15.5939 15.945 15.5939 16.3854C15.5939 16.8258 15.2358 17.1839 14.7954 17.1839Z" fill="white" />
                                                    </svg>
                                                    Купить
                                                    {startAnim && <span className="product-item__animate" ref={addRef}>1</span>}
                                                </button>
                                                <Link href="/checkout" onClick={() => dispatch(preOrder({ id: singlProductData.id, price: singlProductData.salePrice ? singlProductData.salePrice : singlProductData.price, name: singlProductData.title, toggle: true }))}>
                                                    <BronIcon />
                                                    Забронировать
                                                </Link>
                                                <button onClick={() => addToWishList()} style={{ color: "#0C96D1" }}>
                                                    <LikeIcon />
                                                    В избранное
                                                </button>
                                                <button className='chek-btn' onClick={() => toggleModals("create")} >
                                                    <CheckIcon />
                                                    Запросить счет
                                                </button>
                                            </div>
                                        </div>
                                        <div className="produc-single__text-delivery">
                                            <div className="delivery-info">
                                                <h4>
                                                    <Link href="/payment">Условия оплаты:</Link>
                                                </h4>
                                                <ul>
                                                    <li><Link href="/payment">Наличный расчет</Link></li>
                                                    <li><Link href="/payment">Безналичный расчет</Link></li>
                                                    <li><Link href="/payment">Банковской картой</Link></li>
                                                    <li><Link href="/payment" className="credit-link">Кредит</Link></li>
                                                </ul>
                                            </div>
                                            <div className="delivery-info">
                                                <h4>
                                                    <Link href={"/delivery"}>Доставка:</Link>
                                                </h4>
                                                <ul>
                                                    <li><Link href={"/delivery"}>Транспортной компанией</Link></li>
                                                    {/*<li><a href="#">Есть на складе {singlProductData?.quantity} шт.</a></li>*/}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="produc-single__info">
                                    <div className="produc-single__info-buttons">
                                        <button className={toggleInfo ? "active" : "btn"} onClick={() => setToggleInfo(true)}>Характеристики</button>
                                        <button className={!toggleInfo ? "active" : "btn"} onClick={() => setToggleInfo(false)}>Описание</button>
                                    </div>
                                    <div className="produc-single__info-box">
                                        {
                                            toggleInfo ?
                                                <div className="produc-single__info-item">
                                                    {
                                                        singlProductData.attributes.map(el => (
                                                            <p key={el.id}>
                                                                {el.name}
                                                                <span>{el.value}</span>
                                                            </p>
                                                        ))
                                                    }
                                                </div> :
                                                <div className="produc-single__info-item description">
                                                    {parse(singlProductData.description)}
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section >
                    </> : <Loader />
            }
            {appModal === "create" ? <ApplicationModal {...{ appModal, setAppModal }} /> : appModal === "succes" ? <SuccsesModal succsesClick={toggleModals} title={"Ваш запрос принят!"} /> : ""}
        </>

    )
}

export default ProductSingle