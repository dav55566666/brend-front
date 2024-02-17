"use client";
import Image from 'next/image'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logIn, selectUsers } from '../../store/slices/users/usersSlice';
import axios from 'axios';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';
import { fetchUser } from '../../store/slices/users/usersApi';

function Login() {
    const loginRef = useRef(null)

    const dispatch = useDispatch()

    const user = useSelector(selectUsers)

    const router = useRouter()

    const loginSubmit = async (e) => {
        e.preventDefault()

        const [{ value: login }, { value: password }] = loginRef.current

        const { data: loginData } = await axios.post("http://brand.speedshop.am/api/auth/login", {
            email: login,
            password
        })

        if(loginData.access_token) {
            dispatch(fetchUser({userToken: loginData.access_token}))
            dispatch(logIn({...loginData}))
            router.push("/")
        }

        loginRef.current.reset()
    }

    return (
        <section className="login">
            <div className="login__container _container">
                <div className="login__img">
                    <Image src="/img/r9 2.png" alt="img" width={658} height={436} />
                </div>
                <div className="login__form">
                    <h1>Вход</h1>
                    <form ref={loginRef} onSubmit={loginSubmit}>
                        <label className="input-text">эл. адрес<input type="text" className="input" /></label>
                        <label className="input-text">пароль<input type="password" className="input" /></label>
                        <div className="flex">
                            <a href>Забыли пароль?</a>
                            <label className="checkbox">
                                <input type="checkbox" />
                                <span />
                                <p>Запомнить меня</p>
                            </label>
                        </div>
                        <label className="input-btn"><input type="submit" defaultValue="Войти" className="input" /></label>
                        <a href="#" className="reg-link">Создать аккаунт</a>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login