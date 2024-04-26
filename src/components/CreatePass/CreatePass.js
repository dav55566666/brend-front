"use client";
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/slices/users/usersSlice';
import axios from 'axios';
import { useRouter } from 'next/router';
import { fetchUser } from '../../store/slices/users/usersApi';
import Link from 'next/link';
import { EyeIcon, InfoPassIcon, OpenEyeIcon } from '../../svg';

function CreatePass() {
    const loginRef = useRef(null)
    const dispatch = useDispatch()
    const router = useRouter()
    const [togglePass, setTogglePass] = useState(false)
    
    useEffect(() => {
        if(!router.query.adress_token && !router.query.user_id) {
            router.push("/")
        }
    }, [router])

    const loginSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <section className="login">
            <div className="login__container _container">
                <div className="login__img">
                    <img src="https://brend-instrument.ru/img/r9 2.png" alt="img" />
                </div>
                <div className="login__form">
                    <h1>Сброс пароля</h1>
                    <div className='login__passinfo'>
                        <InfoPassIcon />
                        <p>Пожалуйста, введите новый пароль дважды, чтобы убедиться в правильности распечатки.</p>
                    </div>
                    <form ref={loginRef} onSubmit={loginSubmit}>
                        <label className="input-text">пароль
                            <input type={togglePass ? "text" : "password"} className="input" />
                            <button type='button' onClick={() => setTogglePass(!togglePass)} className="showvalue">
                                {
                                    togglePass ? <OpenEyeIcon /> : <EyeIcon />
                                }
                            </button>
                        </label>
                        <label className="input-text">Повторите пароль
                            <input type={togglePass ? "text" : "password"} className="input" />
                            <button type='button' onClick={() => setTogglePass(!togglePass)} className="showvalue">
                                {
                                    togglePass ? <OpenEyeIcon /> : <EyeIcon />
                                }
                            </button>
                        </label>
                        <label className="input-btn"><input type="submit" defaultValue="Подтверждать" className="input" /></label>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CreatePass
