"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, selectUsers, toggleAddress } from '../../store/slices/users/usersSlice'
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { selectCart } from '../../store/slices/cart/cartSlice';
import { useRouter } from 'next/navigation';
import { selectProducts } from '../../store/slices/products/productsSlice';
import { fetchOrders, fetchUser } from '../../store/slices/users/usersApi';
import BasketTable from '../BasketTable/BasketTable';
import SuccsesModal from '../SuccsesModal/SuccsesModal';
import Link from "next/link"
import { fetchCart } from '../../store/slices/cart/cartApi';
function Checkout() {
    const { usersData, loginData } = useSelector(selectUsers)
    const [getUser, setGetUser] = useState(false)
    const [address, setAddress] = useState(false)
    const { preOrder } = useSelector(selectProducts)
    const { totalPrice, guestUserId } = useSelector(selectCart)
    const [payment, setPayment] = useState(false)
    const [toggleSucces, setToggleSucces] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const validationSchema = yup.object().shape({
        name: yup.string()
            .typeError('Напишите свое имя')
            .min(3, 'Слишком короткое имя')
            .required('Обязательное поле'),
        lastName: yup.string()
            .typeError('Напишите свое отчество')
            .min(3, 'Слишком короткое отчество')
            .required('Обязательное поле'),
        email: yup.string()
            .typeError('Пример: example@mail.ru')
            .email('Недопустимый формат')
            .required('Обязательное поле'),
        phone: yup.string()
            .min(3, 'Слишком короткий номер')
            .matches(/[0-9]/, 'Только цифры')
            .required('Обязательное поле'),
        fatherName: yup.string(),
        city: yup.string() .required('Обязательное поле'),
        address_1: yup.string() .required('Обязательное поле')
    });
    useEffect(() => { 
        if(!getUser) {
            if(loginData.access_token) {
                dispatch(fetchUser({userToken: loginData.access_token}))
            }
            setGetUser(true)
        }
    }, [totalPrice, preOrder, usersData])
    const setAddtessType = useCallback(() => { },)
    const succesHandler = useCallback(() => {
        setToggleSucces(false)
    },[])
    return (
        <>
            <section className="checkout">
                <div className="checkout__container _container">
                    <h1>{!preOrder.toggle ? "Оформление заказа" : "Забронировать товар"}</h1>
                    {
                        preOrder.toggle && (
                            <div className='checkout__important'>
                                <p>!Забронируйте инструмент заранее, и мы отложим их специально для вас! Бронь будет действительна в течение 24 часов.</p>
                            </div>
                        )
                    }
                    {
                        !preOrder.toggle && <BasketTable />
                    }
                    <Formik
                        initialValues={{
                            name: usersData.name,
                            lastName: usersData.lastName,
                            fatherName: usersData.fatherName ? usersData.fatherName : "",
                            phone: usersData.phone,
                            email: usersData.email,
                            created_at: usersData.created_at,
                            company: usersData.company ? usersData.company : "",
                            address_1: usersData.address_1 ? usersData.address_1 : "",
                            address_2: usersData.address_2 ? usersData.address_2 : "",
                            city: usersData.city ? usersData.city : "",
                            post: usersData.post ? usersData.post : "",
                            country: usersData.country ? usersData.country : "",
                            region: usersData.region ? usersData.region : ""
                        }}
                        onSubmit={async (values, { resetForm }) => {
                            (loginData.access_token);
                            if (!preOrder.toggle) {
                                if (usersData.name) {
                                    await axios.post(`https://back.brend-instrument.ru/api/auth/create-order`,
                                        {
                                            cmd: 1,
                                            address_id: address ? usersData.address.filter(el => el.checked === true)[0].id : {
                                                name: values.name,
                                                lastName: values.lastName,
                                                fatherName: values.fatherName,
                                                phone: values.phone,
                                                email: values.email,
                                                created_at: values.created_at,
                                                company: values.company,
                                                address_1: values.address_1,
                                                address_2: values.address_2,
                                                city: values.city,
                                                post: values.post,
                                                country: values.country,
                                                region: values.region,
                                                total: totalPrice,
                                                user_id: usersData.id,
                                                delivery: 1,
                                                grant_total: totalPrice,
                                                note: ""
                                            }
                                        },
                                        {
                                            headers: {
                                                Authorization: "Bearer " + loginData.access_token,
                                            }
                                        },
                                    ).then(res => { 
                                        setToggleSucces(res.status === 200 && true)
                                        setTimeout(() => {
                                            dispatch(fetchCart({userToken: loginData.access_token}))
                                            router.push("/orders")
                                        },1900 )
                                    })
                                } else {
                                    const {data: regData} = await axios.post("https://back.brend-instrument.ru/api/auth/registration", {
                                        name: values.name,
                                        lastName: values.lastName, 
                                        phone: values.phone,
                                        email: values.email,
                                        password: "65654654",
                                        password_confirmation: "65654654",
                                        subscribed: false
                                    })
                                    if (regData.access_token) {
                                        dispatch(logIn({ loginData: regData.access_token, save: true}))
                                        dispatch(fetchUser({ userToken: regData.access_token }))
                                        await axios.post(`https://back.brend-instrument.ru/api/auth/create-order`,
                                            {
                                                cmd: usersData.name ? 1 : 2,
                                                uuId: guestUserId,
                                                address_id: {
                                                    name: values.name,
                                                    lastName: values.lastName,
                                                    fatherName: values.fatherName,
                                                    phone: values.phone,
                                                    email: values.email,
                                                    created_at: values.created_at,
                                                    company: values.company,
                                                    address_1: values.address_1,
                                                    address_2: values.address_2,
                                                    city: values.city,
                                                    post: values.post,
                                                    country: values.country,
                                                    region: values.region,
                                                    total: totalPrice,
                                                    user_id: usersData.id,
                                                    delivery: 1,
                                                    grant_total: totalPrice,
                                                    note: ""
                                                }
                                            },
                                            {
                                                headers: {
                                                    Authorization: "Bearer " + regData.access_token,
                                                }
                                            },
                                        ).then(res => { 
                                            setToggleSucces(res.status === 200 && true)
                                            dispatch(fetchOrders({userToken: regData.access_token, limit:  20, page: 1}))
                                            setTimeout(() => {
                                                dispatch(fetchCart({userToken: regData.access_token}))
                                                router.push("/orders")
                                            },1900 )
                                        })
                                    }
                                }
                            } else {
                                if (usersData.name) {
                                    await axios.post(`https://back.brend-instrument.ru/api/auth/pre-order/${preOrder.id}`,
                                        {
                                            cmd: 1,
                                            address_id: address ? usersData.address.filter(el => el.checked === true)[0].id : {
                                                name: values.name,
                                                lastName: values.lastName,
                                                fatherName: values.fatherName,
                                                phone: values.phone,
                                                email: values.email,
                                                created_at: values.created_at,
                                                company: values.company,
                                                address_1: values.address_1,
                                                address_2: values.address_2,
                                                city: values.city,
                                                post: values.post,
                                                country: values.country,
                                                region: values.region,
                                                total: totalPrice,
                                                user_id: usersData.id,
                                                delivery: 1,
                                                grant_total: totalPrice,
                                                note: ""
                                            }
                                        },
                                        {
                                            headers: {
                                                Authorization: "Bearer " + loginData.access_token,
                                            }
                                        }
                                    ).then(res => { 
                                        setToggleSucces(res.status === 200 && true)
                                        setTimeout(() => {
                                            dispatch(fetchCart({userToken: loginData.access_token}))
                                            router.push("/orders")
                                        },1900 )
                                    })

                                } else {
                                    const { data: regData } = await axios.post("https://back.brend-instrument.ru/api/auth/registration", {
                                        name: values.name,
                                        lastName: values.lastName,
                                        phone: values.phone,
                                        email: values.email,
                                        password: "65654654",
                                        password_confirmation: "65654654",
                                        subscribed: false
                                    })
                                    if (regData.access_token) {
                                        dispatch(fetchUser({ userToken: regData.access_token }))
                                        await axios.post(`https://back.brend-instrument.ru/api/auth/pre-order/${preOrder.id}`,
                                            {
                                                cmd: usersData.name ? 1 : 2,
                                                uuId: guestUserId,
                                                address_id: {
                                                    name: values.name,
                                                    lastName: values.lastName,
                                                    fatherName: values.fatherName,
                                                    phone: values.phone,
                                                    email: values.email,
                                                    created_at: values.created_at,
                                                    company: values.company,
                                                    address_1: values.address_1,
                                                    address_2: values.address_2,
                                                    city: values.city,
                                                    post: values.post,
                                                    country: values.country,
                                                    region: values.region,
                                                    total: totalPrice,
                                                    user_id: usersData.id,
                                                    delivery: 1,
                                                    grant_total: totalPrice,
                                                    note: ""
                                                }
                                            },
                                            {
                                                headers: {
                                                    Authorization: "Bearer " + loginData.access_token,
                                                }
                                            }
                                        ).then(res => { 
                                            setToggleSucces(res.status === 200 && true)
                                            dispatch(fetchOrders({userToken: regData.access_token, limit:  20, page: 1}))
                                            setTimeout(() => {
                                                dispatch(fetchCart({userToken: regData.access_token}))
                                                router.push("/orders")
                                            },1900 )
                                        })
                                    }
                                }
                            }
                            resetForm();
                        }}
                        validateOnBlur
                        validationSchema={address ? null : validationSchema}
                    >{({ values, errors, touched, handleChange, handleBlur, isValid, dirty, handleSubmit }) => (
                        <Form autoComplete="off" onSubmit={handleSubmit} className='checkout__form'>
                            <div className="checkout__form-left">
                                <div className="checkout__select">
                                    {/* <div className="checkout__select-item">
                                        <div className="title">
                                            <svg width={36} height={36} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M34.2 19.1302V17.9975C34.2 17.4454 33.977 16.9161 33.5806 16.5277L27.4292 10.5011C27.0383 10.1181 26.5106 9.90335 25.9607 9.90335H22.8572V8.75065C22.8572 7.89425 22.1561 7.19995 21.2912 7.19995H3.36605C2.50115 7.19995 1.80005 7.8942 1.80005 8.75065V19.1302H34.2ZM24.6998 11.9347C24.6998 11.8003 24.8094 11.6917 24.9452 11.6917H26.0779C26.1406 11.6917 26.2032 11.7176 26.2501 11.7589L31.0681 16.3127C31.2299 16.4627 31.1203 16.7315 30.9011 16.7315H24.9452C24.8096 16.7315 24.6999 16.6229 24.6999 16.4885V11.9347H24.6998ZM34.2 19.987V23.42C34.2 24.2764 33.4989 24.9706 32.6341 24.9706H30.9585C30.6557 22.9134 28.8653 21.3317 26.7043 21.3317C24.5485 21.3317 22.7581 22.9134 22.4553 24.9706H13.9625C13.6598 22.9134 11.8693 21.3317 9.71348 21.3317C7.55767 21.3317 5.7672 22.9134 5.46448 24.9706H3.36605C2.50115 24.9706 1.80005 24.2765 1.80005 23.4201V19.987L34.2 19.987ZM26.7065 22.3675C24.9127 22.3675 23.4585 23.8075 23.4585 25.5837C23.4585 27.36 24.9128 28.8 26.7065 28.8C28.5003 28.8 29.9545 27.36 29.9545 25.5837C29.9545 23.8075 28.5003 22.3675 26.7065 22.3675ZM26.7065 27.1919C25.8097 27.1919 25.0826 26.4719 25.0826 25.5837C25.0826 24.6956 25.8096 23.9757 26.7065 23.9757C27.6034 23.9757 28.3306 24.6956 28.3306 25.5837C28.3306 26.4719 27.6034 27.1919 26.7065 27.1919ZM9.71285 22.3675C7.91904 22.3675 6.46491 23.8075 6.46491 25.5837C6.46491 27.36 7.9191 28.8 9.71285 28.8C11.5066 28.8 12.9608 27.36 12.9608 25.5837C12.9608 23.8075 11.5066 22.3675 9.71285 22.3675ZM9.71285 27.1919C8.81597 27.1919 8.08883 26.4719 8.08883 25.5837C8.08883 24.6956 8.81592 23.9757 9.71285 23.9757C10.6097 23.9757 11.3368 24.6956 11.3368 25.5837C11.3368 26.4719 10.6097 27.1919 9.71285 27.1919Z" fill="#0C96D1" />
                                            </svg>
                                            <p>Способ доставки</p>
                                        </div>
                                        <label className="checkbox" onClick={() => setDelivery(true) }>
                                            <input type="checkbox" checked={delivery ? true : false} />
                                            <span />
                                            <p>Доставка курьером</p>
                                        </label>
                                        <label className="checkbox" onClick={() => setDelivery(false)}>
                                            <input type="checkbox" checked={delivery ? false : true} />
                                            <span />
                                            <p>Транспортной компанией</p>
                                        </label>
                                    </div> */}
                                    <div className="checkout__select-item">
                                        <div className="title">
                                            <svg width={36} height={36} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M33.2808 7H3.38893C2.62301 7 2 7.62301 2 8.38874V12.0213V17.7374V27.8815C2 28.6473 2.62301 29.2703 3.38893 29.2703H33.2808C34.0466 29.2703 34.6697 28.6473 34.6697 27.8815V17.7374V12.0213V8.38874C34.6696 7.62301 34.0466 7 33.2808 7ZM7.24606 25.1622H5.85417V20.8009H7.24606V25.1622ZM10.0299 25.1622H8.63796V20.8009H10.0299V25.1622ZM12.8137 25.1622H11.4218V20.8009H12.8137V25.1622ZM27.8686 25.8335C27.3563 25.8335 26.864 25.6803 26.4475 25.3961C26.0309 25.6802 25.5386 25.8335 25.0263 25.8335C23.6325 25.8335 22.4987 24.6996 22.4987 23.3057C22.4987 21.9119 23.6325 20.7779 25.0263 20.7779C25.5386 20.7779 26.0309 20.9311 26.4475 21.2154C26.864 20.9311 27.3563 20.7779 27.8686 20.7779C29.2625 20.7779 30.3965 21.9119 30.3965 23.3057C30.3966 24.6995 29.2626 25.8335 27.8686 25.8335ZM33.7417 16.8095H2.92793V12.9493H33.7417V16.8095Z" fill="#0C96D1" />
                                            </svg>
                                            <p>Способ оплаты</p>
                                        </div>
                                        {!preOrder.toggle ? <label className="checkbox" onClick={() => setPayment(true)}>
                                            <input type="checkbox" checked={payment ? true : false} />
                                            <span />
                                            <p>Наличными при получении</p>
                                        </label> : ""}
                                        <label className="checkbox" onClick={() => setPayment(false)}>
                                            <input type="checkbox" checked={payment ? false : true} />
                                            <span />
                                            <p>Робокасса</p>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="checkout__right">
                                <h2>
                                    <svg width={40} height={45} viewBox="0 0 40 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.96448 2.46448C2.5 3.92893 2.5 6.28595 2.5 11V33.5C2.5 38.214 2.5 40.571 3.96448 42.0355C5.42893 43.5 7.78595 43.5 12.5 43.5H27.5C32.214 43.5 34.571 43.5 36.0355 42.0355C37.5 40.571 37.5 38.214 37.5 33.5V11C37.5 6.28595 37.5 3.92893 36.0355 2.46448C34.571 1 32.214 1 27.5 1H12.5C7.78595 1 5.42893 1 3.96448 2.46448ZM12.5 11C11.1193 11 10 12.1193 10 13.5C10 14.8807 11.1193 16 12.5 16H27.5C28.8808 16 30 14.8807 30 13.5C30 12.1193 28.8808 11 27.5 11H12.5ZM12.5 21C11.1193 21 10 22.1192 10 23.5C10 24.8807 11.1193 26 12.5 26H27.5C28.8808 26 30 24.8807 30 23.5C30 22.1192 28.8808 21 27.5 21H12.5ZM12.5 31C11.1193 31 10 32.1192 10 33.5C10 34.8807 11.1193 36 12.5 36H22.5C23.8808 36 25 34.8807 25 33.5C25 32.1192 23.8808 31 22.5 31H12.5Z" fill="#0C96D1" />
                                    </svg>
                                    Детали заказа
                                </h2>
                                {
                                    !usersData.name && (
                                        <div className='user-buttons'>
                                            <Link href="/login">Вход /</Link>
                                            <Link href="/registration"> Регистрация</Link>
                                        </div>
                                    ) 
                                }
                                {
                                    usersData.address?.length ?
                                        <>
                                            <label className="checkbox" onClick={() => { setAddress(true) }}>
                                                <input type="checkbox" checked={address ? true : false} />
                                                <span />
                                                <p>Я хочу использовать существующий адрес</p>
                                            </label>
                                            {
                                                address ?
                                                    usersData.address.map(el => (
                                                        <label className="checkbox address-checkbox" key={el.id} onClick={() => dispatch(toggleAddress({ id: el.id }))}>
                                                            <input type="checkbox" checked={el.checked} />
                                                            <span />
                                                            <p>{el.name}, {el.address_1} {el.phone} </p>
                                                        </label>
                                                    )) : ""
                                            }
                                        </>
                                        : ""
                                }
                                <label className="checkbox" onClick={() => setAddress(false)}>
                                    <input type="checkbox" checked={address ? false : true} />
                                    <span />
                                    <p>{usersData.name ? "Я хочу использовать новый адрес" : "Новый покупатель"}</p>
                                </label>
                                {
                                    address ? "" :
                                        <div className="checkout__newadres">
                                            <label className="input-text">Имя *<Field type="text" className="input" placeholder="Иван" name="name" defaultValue={usersData.name} autoComplete="off" style={{ borderColor: errors.name && touched.name ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label>
                                            <label className="input-text">Фамилия *<Field type="text" className="input" placeholder="Иванов" name="lastName" defaultValue={usersData.lastName} autoComplete="off" style={{ borderColor: errors.lastName && touched.lastName ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label>
                                            <label className="input-text">Отчество<Field type="text" className="input" placeholder="Иванович" autoComplete="off" name="fatherName" style={{ borderColor: errors.fatherName && touched.fatherName ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label>
                                            <label className="input-text">Эл. адрес *<Field type="text" className="input" placeholder="ivan.ivanovich@gmail.com" defaultValue={usersData.email} name="email" autoComplete="off" style={{ borderColor: errors.email && touched.email ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label>
                                            <label className="input-text">Телефон *<Field type="text" className="input" placeholder="+791 502 31111" defaultValue={usersData.phone} name="phone" autoComplete="off" style={{ borderColor: errors.phone && touched.phone ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label>
                                            {/* <label className="input-text">Компания<Field type="text" className="input" placeholder="TESTWEB" defaultValue={usersData.company && usersData.company} name="company" autoComplete="off" style={{ borderColor: errors.company && touched.company ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label> */}
                                            <label className="input-text">Адрес *<Field type="text" className="input" placeholder="Адрес" defaultValue={usersData.address_1 && usersData.address_1} name="address_1" autoComplete="off" style={{ borderColor: errors.address_1 && touched.address_1 ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label>
                                            {/* <label className="input-text">Адрес 2<Field type="text" className="input" placeholder="Адрес 2" defaultValue={usersData.address_2 && usersData.address_2} name="address_2" autoComplete="off" style={{ borderColor: errors.address_2 && touched.address_2 ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label> */}
                                            <label className="input-text">Город *<Field type="text" className="input" placeholder="Город" defaultValue={usersData.city && usersData.city} name="city" autoComplete="off" style={{ borderColor: errors.city && touched.city ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label>
                                            {/* <label className="input-text">Почтовый индекс *<Field type="text" className="input" placeholder={125009} defaultValue={usersData.post && usersData.post} name="post" autoComplete="off" style={{ borderColor: errors.post && touched.post ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label> */}
                                            {/* <label className="input-text">Страна *<Field type="text" className="input" placeholder="Российская Федерация" defaultValue={usersData.country && usersData.country} name="country" autoComplete="off" style={{ borderColor: errors.country && touched.country ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label> */}
                                            {/* <label className="input-text">Регион / Область *<Field type="text" className="input" placeholder="Алтайский край" defaultValue={usersData.region && usersData.region} name="region" autoComplete="off" style={{ borderColor: errors.region && touched.region ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label> */}
                                        </div>
                                }
                                <label className="input-text">примечания
                                    <textarea cols={30} rows={10} className="input textarea" defaultValue={""} />
                                </label>
                                <div className="checkout__instructions">
                                    <h4>Инструкция</h4>
                                    <p>Получатель платежа:
                                        <span>БРЕНД-Инструмент</span>
                                    </p>
                                    <p>Прием платежей по адресу:
                                        <span>Москва, Рязанский проспект, д.30, корп.2.ТЦ «Рязанский», цокольный этаж.</span>
                                    </p>
                                </div>
                                <div className="checkout__total">
                                    <h4>Общая сумма к оплате</h4>
                                    <p>Сумма:
                                        <span>{preOrder.toggle ? preOrder.price : totalPrice} ₽</span>
                                    </p>
                                    {/* <p>Доставка:
                                        <span>0 ₽</span>
                                    </p> */}
                                    <p>Итого:
                                        <span>{preOrder.toggle ? preOrder.price : totalPrice} ₽</span>
                                    </p>
                                </div>
                                <label className="input-btn">
                                    <input type="submit" defaultValue="Оформить заказ" className="input" />
                                </label>
                            </div>
                        </Form>
                    )}
                    </Formik>
                </div>
            </section>
            {toggleSucces && <SuccsesModal succsesClick={succesHandler} title={"Ваш заказ принят!"} />}
        </>

    )
}

export default Checkout