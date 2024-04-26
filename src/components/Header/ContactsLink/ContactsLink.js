"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { LocateIcon,PhoneIcon } from '../../../svg'
import { useDispatch, useSelector } from 'react-redux'
import { selectContacts } from '../../../store/slices/contacts/contactsSlice'
import { fetchContacts } from '../../../store/slices/contacts/contactsApi'

function ContactsLink() {
  
  const {contactsData} = useSelector(selectContacts)
  const [getContacts, setGetContacts] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if(!getContacts) {
      dispatch(fetchContacts())
      setGetContacts(true)
    }
  }, [contactsData, getContacts])

  return (
    <>
      <Link href="/">
        {contactsData?.address}
      </Link>
      <a href={`tel:${contactsData?.phone_1}`}>
        {contactsData?.phone_1}
      </a>
    </>
  )
}

export default ContactsLink