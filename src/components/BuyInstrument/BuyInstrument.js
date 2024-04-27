'use client'
import { selectContacts } from '@/store/slices/contacts/contactsSlice'
import { ContactsWpIcon, ViberIcon, SkypeIcon, TgIcon, CalendarIcon } from '@/svg'
import React from 'react'
import { useSelector } from 'react-redux'

function BuyInstrument() {
    const { contactsData } = useSelector(selectContacts)

    return (
        <section className="information-page">
            <div className="information-page__container _container">
                <div className="information-page__text">
                    <h1>Условия скупки строительного б/у электроинструмента</h1>
                    <p>Ненужных инструментов не бывает, хотя нередко после ремонтов или строительных работ они пылятся в ящиках. Но не все знают, что, казалось бы, лежащий без дела инструмент может принести значительный доход и обрести при этом нового владельца. Для этого наш сервис предлагает такую услугу, как скупка строительных инструментов.</p>
                    <p>Если Вы давно желаете приобрести новый инструмент и продать старый, или же просто не находите ему применения, или же нуждаетесь в срочном пополнении денежного баланса, то зашли прямо по адресу!</p>
                    <p style={{fontWeight: "700"}}>Скупка инструмента осуществляется только если он в рабочем состоянии.</p>
                    <p>Если Вы решили продать свой инструмент, пришлите фото и наименование инструмента на номер Whatsapp 8-929-535-07-04. Оценщик ответит Вам и, в случае, если обе стороны пришли к согласию, Вы можете привезти инструмент по адресу: <span style={{fontWeight: "700"}}>г.Москва, Рязанский пр-т, д. 30, корпус 2, ТЦ «Рязанский» . Ближайшее метро Рязанский проспект или Окская. Режим работы: без выходных и праздников с 9.30 до 20.30.</span> </p>
                    <p style={{fontWeight: "700"}}>Без предварительного согласования скупка инструмента НЕ ОСУЩЕСТВЛЯЕТСЯ!</p>
                    <p>Наш сервис состоит из опытных специалистов, которые определяют точную стоимость инструментов на вторичном рынке. Цена Вашего оборудования напрямую будет зависеть от его внешнего вида, состояния, актуальности (современности) и производителя.</p>
                    <p>Все интересующие Вас вопросы касаемо закупки можете задавать по телефонам +7(499)755-54-64, (925)190-76-60, или посылать на почту brendinstrument@mail.ru. Мы с удовольствием примем Ваши предложения, рассмотрим всевозможные варианты и обязательно найдём выгодные условия для обеих сторон.</p>
                </div>
                <div className="information-page__contacts">
                    <a href={"https://t.me/"+contactsData?.contact_telegram.replace(/[^0-9+]/g, '')}>
                        <TgIcon />
                    </a>
                    {/*<a href={contactsData?.contact_skype.length > 0 ?? contactsData?.contact_skype.replace(/[^0-9+]/g, '')}>*/}
                    {/*    <SkypeIcon />*/}
                    {/*</a>*/}
                    {/*<a href={contactsData?.contact_viber.replace(/[^0-9+]/g, '')}>*/}
                    {/*    <ViberIcon />*/}
                    {/*</a>*/}
                    <a href={`https://api.whatsapp.com/send?phone=${contactsData?.whats_up.replace(/[^0-9+]/g, '')}`}>
                        <ContactsWpIcon  />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default BuyInstrument