"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { selectContacts } from '../../store/slices/contacts/contactsSlice'
import Link from 'next/link'
import { AssetIcon, CallBackMailIcon, ContactsWpIcon, LocateIcon, OkIcon, PhoneIcon, SkypeIcon, TgIcon, TikTokIcon, TimeIcon, ViberIcon, VkIcon, WpIcon, YoutubeIcon } from '../../svg'

function Contacts() {
    const {contactsData} = useSelector(selectContacts)
    return (
        <section className="contacts">
            <div className="contacts__container _container">
                <div className="contacts__info">
                    <h1>Наши контакты</h1>
                    <div className="contacts__item">
                        {/* <div className="icon">
                            <LocateIcon />
                        </div> */}
                        <div className="text">
                            <Link href="#">{contactsData?.address}</Link>
                        </div>
                    </div>
                    <div className="contacts__item">
                        {/* <div className="icon">
                            <PhoneIcon />
                        </div> */}
                        <div className="text">
                            <a href={`tel:${contactsData?.phone_1}`}>{contactsData?.phone_1}</a>
                            <a href={`tel:${contactsData?.phone_2}`}>{contactsData?.phone_2}</a>
                            <a href={`tel:${contactsData?.phone_3}`}>{contactsData?.phone_3}</a>
                        </div>
                    </div>
                    <div className="contacts__item">
                        {/* <div className="icon">
                            <WpIcon />
                        </div> */}
                        <div className="text">
                            <a href={`https://api.whatsapp.com/send?phone=${contactsData?.whats_up}`}>{contactsData?.whats_up}</a>
                        </div>
                    </div>
                    <div className="contacts__item">
                        {/* <div className="icon">
                            <CallBackMailIcon />
                        </div> */}
                        <div className="text">
                            <a href={`mailto:${contactsData?.email_1}`} >{contactsData?.email_1}</a>
                            <a href={`mailto:${contactsData?.email_2}`} >{contactsData?.email_2}</a>
                        </div>
                    </div>
                    <div className="contacts__item">
                        {/* <div className="icon">
                            <TimeIcon />
                        </div> */}
                        <div className="text">
                            <h4>Часы работы</h4>
                            <p>Ежедневно с 09:30 до 20:30</p>
                            <p>Без выходных и праздничных дней.</p>
                        </div>
                    </div>
                    <div className="contacts__callback">
                        <p>Еще можете связаться с нами</p>
                        <div className="contacts__callback-flex">
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
                                <ContactsWpIcon  />
                            </a>
                        </div>
                    </div>
                    <div className="contacts__soc">
                        <p>Подпишитесь на нас</p>
                        <div className="contacts__soc-flex">
                            <a href={contactsData?.sub_tiktok}>
                                <TikTokIcon />
                            </a>
                            <a href={contactsData?.sub_youtube}>
                                <YoutubeIcon />
                            </a>
                            <a href={contactsData?.sub_vk}>
                                <VkIcon />
                            </a>
                            <a href={contactsData?.sub_od}>
                                <OkIcon />
                            </a>
                            <a href={contactsData?.sub_x}>
                                <AssetIcon />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="contacts__map">
                    <h3>Перед приездом ОБЯЗАТЕЛЬНО по телефону уточняйте наличие товара на складе!</h3>
                    <iframe src="https://yandex.ru/map-widget/v1/?ll=37.784075%2C55.718192&mode=whatshere&whatshere%5Bpoint%5D=37.784075%2C55.718192&whatshere%5Bzoom%5D=17&z=17" />
                </div>
            </div>
        </section>
    )
}

export default Contacts