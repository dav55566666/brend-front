"use client";
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/slices/users/usersSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { fetchUser } from '../../store/slices/users/usersApi';
import Link from 'next/link';
import { InfoPassIcon } from '../../svg';

function RememberPass() {
    const loginRef = useRef(null)
    const dispatch = useDispatch()
    const router = useRouter()
    const [errorMail, setErrorMail] = useState(false)

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const loginSubmit = async (e) => {
        e.preventDefault()

        const [{ value: mail },] = loginRef.current

        await axios.post(`https://back.brend-instrument.ru/api/auth/forgot-password`,
            {
                email: mail
            }
        )
    }

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setErrorMail(!validateEmail(value))
    }

    return (
        <section className="login">
            <div className="login__container _container">
                <div className="login__img">
                    <img src="https://brend-instrument.ru/img/r9 2.png" alt="img" />
                </div>
                <div className="login__form">
                    <h1>Забыли пароль?</h1>
                    <div className='login__passinfo'>
                        <InfoPassIcon />
                        <p>Пожалуйста, введите свой E-mail ниже, и мы вышлем вам настройки для создания нового пароля.</p>
                    </div>
                    <form ref={loginRef} onSubmit={loginSubmit}>
                        <label className="input-text">
                            Введите эл. адрес *
                            <input type="email" className="input" style={{ borderColor: errorMail ? "#D70000" : "#EDEDED" }} onChange={handleEmailChange} />
                            {errorMail && <p style={{ color: "#D70000" }} className='error-text' >Пожалуйста, введите корректный email-адрес</p>}
                        </label>
                        <label className="input-btn"><input type="submit" defaultValue="Войти" className="input" disabled={errorMail} /></label>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default RememberPass
