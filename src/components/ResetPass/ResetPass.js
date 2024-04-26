"use client"
import React, { useCallback, useRef, useState } from 'react'
import MyRoomMenu from '../MyRoomMenu/MyRoomMenu'
import { EyeIcon, InfoPassIcon, OpenEyeIcon } from '../../svg'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectUsers } from '../../store/slices/users/usersSlice'
import SuccsesModal from '../SuccsesModal/SuccsesModal'

function ResetPass() {
    const [togglePass, setTogglePass] = useState(false)
    const [toggleSucces, setToggleSucces] = useState(false)
    const { loginData } = useSelector(selectUsers)
    const resetPassRef = useRef(null)
    const resetPassSubmit = (e) => {
        e.preventDefault()
        if (resetPassRef.current[0].value === resetPassRef.current[2].value) {
            axios.get(`https://back.brend-instrument.ru/api/auth/reset?password=${resetPassRef.current[0].value}`,
                {
                    headers: {
                        Authorization: "Bearer " + loginData.access_token, "Content-Type": "application/json"
                    }
                }
            ).then(res => {
                if(res.status === 200) {
                    toggleSuccesClick(true)
                    resetPassRef.current.reset()
                }
            })
        }
    }

    const toggleSuccesClick = useCallback((value) => {
        setToggleSucces(value)
    }, [toggleSucces])

    return (
        <>
            {
                toggleSucces && <SuccsesModal title={"Ваш пароль успешно изменен! "} succsesClick={toggleSuccesClick} />
            }
            <section className="reset-pass">
                <div className="reset-pass__container _container">
                    <h1>Личный Кабинет</h1>
                    <div className="reset-pass__flex">
                        <MyRoomMenu />
                        <div className="reset-pass__right">
                            <form onSubmit={resetPassSubmit} ref={resetPassRef}>
                                <h2>Изменить пароль</h2>
                                <p>
                                    <InfoPassIcon />
                                    Пожалуйста, введите новый пароль дважды, чтобы убедиться в правильности распечатки.
                                </p>
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
                                <label className="input-btn"><input type="submit" defaultValue="Сохранить" className="input" /></label>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default ResetPass