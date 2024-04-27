"use client"
import axios from 'axios'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUsers } from '../../store/slices/users/usersSlice'
import SuccsesModal from '../SuccsesModal/SuccsesModal'

function Callback() {
    const callbackRef = useRef(null)
    const {usersData} = useSelector(selectUsers)
    const [toggleSuccses, setToggleSuccses] = useState(false)
    const sendForm = (e) => {
        e.preventDefault()
        axios.post(`https://back.brend-instrument.ru/api/questions`, {
            name: callbackRef.current[0].value,
            email: callbackRef.current[1].value,
            notes: callbackRef.current[2].value
        }).then(({data}) => {
            if(data.status === 200) {
                setToggleSuccses(true)
                callbackRef.current.reset()
            }
        })
    }
    useEffect(() => {}, [usersData])
    const toggleSuccsesHandler = useCallback(() => {setToggleSuccses(false)}, [])
    return (
        <>
            <section className="callback">
                <div className="callback__container _container">
                    <div className="callback__text">
                        <h2>у вас есть вопросы?</h2>
                        <form ref={callbackRef} onSubmit={sendForm} >
                            <div className="flex">
                                <label className="input-text">Имя и Фамилия *<input type="text" required className="input" defaultValue={usersData.name && usersData.name} /></label>
                                <label className="input-text">эл. адрес *<input type="email" required className="input" defaultValue={usersData.email && usersData.email} /></label>
                            </div>
                            <label className="input-text"><textarea name id cols={30} rows={10} className="input textarea" placeholder="Ваши вопросы ...." /></label>
                            <label className="input-btn"><input type="submit" defaultValue="Отправить" required className="input" /></label>
                        </form>
                    </div>
                    <div className="callback__img">
                        <Image src="https://brend-instrument.ru/img/image.png" alt="img" width={644} height={492} />
                    </div>
                </div>
            </section>
            {toggleSuccses && <SuccsesModal title={"Ваш запрос принят!"} succsesClick={toggleSuccsesHandler} />}
        </>
    )
}

export default Callback