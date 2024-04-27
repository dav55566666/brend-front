"use client";
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/slices/users/usersSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { fetchUser } from '../../store/slices/users/usersApi';
import Link from 'next/link';

function Login() {

    const loginRef = useRef(null)
    const dispatch = useDispatch()
    const [errorMassage, setErrorMassage] = useState(false)
    const router = useRouter()

    const loginSubmit = async (e) => {
        e.preventDefault()

        const [{ value: login }, { value: password }] = loginRef.current

        await axios.post("https://back.brend-instrument.ru/api/auth/login", {
            email: login,
            password
        }).then(res => {
            dispatch(fetchUser({ userToken: res.data.access_token }))
            dispatch(logIn({ loginData: res.data, save: loginRef.current[2].checked }))
            loginRef.current.reset()
            router.back()
        }).catch(({response: res}) => {
            if (res.data.message === 'Unauthorized') {
                setErrorMassage(true)
            }
        })

    }

    return (
        <section className="login">
            <div className="login__container _container">
                <div className="login__img">
                    <img src="https://brend-instrument.ru/img/r9 2.png" alt="img"  />
                </div>
                <div className="login__form">
                    <h1>Вход</h1>
                    {
                        errorMassage && <p className="error-massage">Логин или пароль не верно</p>
                    }
                    <form ref={loginRef} onSubmit={loginSubmit}>
                        <label className="input-text">эл. адрес<input type="text" className="input" /></label>
                        <label className="input-text">пароль<input type="password" className="input" /></label>
                        <div className="flex">
                            <Link href="/rememberPass">Забыли пароль?</Link>
                            <label className="checkbox">
                                <input type="checkbox" />
                                <span />
                                <p>Запомнить меня</p>
                            </label>
                        </div>
                        <label className="input-btn"><input type="submit" defaultValue="Войти" className="input" value={'Войти'} /></label>
                        <Link href="/registration/" className="reg-link">Регистрация</Link>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login