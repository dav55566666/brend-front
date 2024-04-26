"use client"
import { selectContacts } from '@/store/slices/contacts/contactsSlice'
import { TgIcon } from '@/svg'
import React from 'react'
import { useSelector } from 'react-redux'

function Subscribe() {
  const { contactsData } = useSelector(selectContacts)
  return (
    <section className='subscribe'>
      <div className='subscribe__container _container'>
        <h2>Подписывайтесь на наш телеграмм канал</h2>
        <a href={contactsData?.contact_telegram} target='_blank'>
          <TgIcon />
          Подписатся
        </a>
      </div>
    </section>
  )
}

export default Subscribe