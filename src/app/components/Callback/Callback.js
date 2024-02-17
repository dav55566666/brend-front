import Image from 'next/image'
import React from 'react'

function Callback() {
    return (
        <section className="callback">
            <div className="callback__container _container">
                <div className="callback__text">
                    <h2>у вас есть вопросы?</h2>
                    <form >
                        <div className="flex">
                            <label className="input-text">Имя и Фамилия *<input type="text" className="input" /></label>
                            <label className="input-text">эл. адрес *<input type="text" className="input" /></label>
                        </div>
                        <label className="input-text"><textarea name id cols={30} rows={10} className="input textarea" placeholder="Ваши заметки ...." defaultValue={""} /></label>
                        <label className="input-btn"><input type="submit" defaultValue="Отправить" className="input" /></label>
                    </form>
                </div>
                <div className="callback__img">
                    <Image src="/img/image.png" alt="img" />
                </div>
            </div>
        </section>

    )
}

export default Callback