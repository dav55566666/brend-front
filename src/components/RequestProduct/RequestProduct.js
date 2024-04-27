"use client"
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import CallbackModal from '../CallbackModal/CallbackModal'
import SuccsesModal from '../SuccsesModal/SuccsesModal'

function RequestProduct() {
    const [modalToggle, setModalToggle] = useState(null)
    const toggleClick = useCallback((value) => {
        setModalToggle(value)
    }, [])
    return (
        <>
            <section className="request-product">
                <div className="request-product__container _container">
                    <h2>Заявка на подбор товара!</h2>
                    <div className="request-product__img">
                        <Image src="https://brend-instrument.ru/img/ser-top 1.png" alt="img" width={418} height={274} />
                    </div>
                    <button onClick={() => setModalToggle("callback")}>Связаться с менеджером</button>
                </div>
            </section>
            {
                modalToggle === "callback" ? <CallbackModal succsesClick={toggleClick} /> : <></>
            }
            {
                modalToggle === "succes" ? <SuccsesModal succsesClick={toggleClick} title={"Ваш запрос принят!"} /> : <></>
            }
        </>
    )
}

export default RequestProduct