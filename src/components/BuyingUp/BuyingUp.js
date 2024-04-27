import React from 'react'
import { ChekIcon } from '../../svg'

function BuyingUp() {
    return (
        <section className="buying-up">
            <div className="buying-up__container _container">
                <h4 className="buying-up__subtitle" />
                <div className="section-title">
                    <h2>Выкупаем практически все</h2>
                </div>
                <div className="buying-up__flex">
                    <div className="buying-up__item">
                        <div className="icon">
                            <ChekIcon />
                        </div>
                        <p>Выдаем деньги сразу</p>
                    </div>
                    <div className="buying-up__item">
                        <div className="icon">
                            <ChekIcon />
                        </div>
                        <p>Проверка за 10 минут</p>
                    </div>
                    <div className="buying-up__item">
                        <div className="icon">
                            <ChekIcon />
                        </div>
                        <p>Работаем с 2010 года</p>
                    </div>
                    {/*<div className="buying-up__item">*/}
                    {/*    <div className="icon">*/}
                    {/*        <ChekIcon />*/}
                    {/*    </div>*/}
                    {/*    <p>Возможно выкупить товар</p>*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>

    )
}

export default BuyingUp