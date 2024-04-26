"use client"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUsers } from '../../../store/slices/users/usersSlice'
import Link from 'next/link'
import { UserIcon } from '../../../svg'

function UserBtn() {
  const {usersData} = useSelector(selectUsers)
  useEffect(() => {}, [usersData])
  return (
    <>
      {
        usersData?.name ?
          <Link href={"/personalRoom"}>
            <UserIcon />
            <span>{usersData.name}</span>
          </Link> :
          <Link href="/login">
            <UserIcon />
            <span>Войти</span>
          </Link>
      }
    </>
  )
}

export default UserBtn