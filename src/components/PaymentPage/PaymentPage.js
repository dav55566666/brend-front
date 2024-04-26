'use client'
import { selectContacts } from '@/store/slices/contacts/contactsSlice'
import { ContactsWpIcon, ViberIcon, SkypeIcon, TgIcon, CalendarIcon } from '@/svg'
import React from 'react'
import { useSelector } from 'react-redux'

function PaymentPage() {
    const { contactsData } = useSelector(selectContacts)

    return (
        <section className="information-page">
            <div className="information-page__container _container">
                <div className="information-page__text">
                    <h1>Условия продажи и оплаты</h1>
                    <p>Специализацией нашего сервиса является <span style={{fontWeight: "700"}}>скупка и продажа строительного инструмента</span> Это оптимальный вариант для тех, кому надоел старый инструмент, и тех, кто заинтересован в покупке б/у. У нас Вы сможете найти инструменты от известных брендов в желанном ценовом диапазоне.</p>
                    <p>Если Вас заинтересовали инструменты б/у, и Вы хотите поскорее их приобрести, то с нами всё предельно просто. Достаточно <span style={{fontWeight: "700"}}>выбрать интересующий товар в нашем каталоге, связаться с менеджером по телефонам +7(499) 755-54-64, +7 (925) 190-76-60 и договориться о времени приезда на склад.</span> Так же, Вы можете произвести оплату в режиме онлайн через сервис приема платежей <span style={{fontWeight: "700"}}>Robokassa</span></p>
                    <p>В связи с нашей специализацией мы <span style={{fontWeight: "700", textDecoration: "underline"}}>не предоставляем гарантий на реализуемый товар.</span> Но в нашем сервисе работают ответственные и квалифицированные специалисты, и прежде чем выставлять инструмент на продажу, мы тщательно его проверяем и тестируем. Мы не занимаемся продажей бракованной или неисправной продукции, предоставляем детальное описание товара и всегда указываем дефекты (только не препятствующие использованию инструмента по его прямому назначению).</p>
                    <h3> <span style={{fontWeight: "700", textDecoration: "underline" }}>По запросу клиента готовы предоставить видео обзор на выбранный инструмент!</span> <span style={{fontWeight: "700"}}>(на эл.почту,WA)</span></h3>
                    <p style={{fontWeight: "700"}}>Форма оплаты любая, работаем без НДС.</p>
                    <p>Но мы более чем уверены, что таких неприятностей не возникнет, так как ответственно подходим ко всем вопросам скупки и дорожим своей клиентской базой и репутацией.</p>
                    <p>У нас Вы всегда сможете приобрести качественный товар нужного Вам назначения и вида – аккумуляторный, измерительный, многофункциональный инструмент, для ремонтных и строительных работ. Мы всегда идём навстречу нашим клиентам и предлагаем наиболее выгодные условия скупки/продажи.</p>
                </div>
                <div className="information-page__contacts">
                    <a href={contactsData?.contact_telegram}>
                        <TgIcon />
                    </a>
                    <a href={contactsData?.contact_skype}>
                        <SkypeIcon />
                    </a>
                    <a href={contactsData?.contact_viber}>
                        <ViberIcon />
                    </a>
                    <a href={`https://api.whatsapp.com/send?phone=${contactsData?.whats_up}`}>
                        <ContactsWpIcon />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default PaymentPage