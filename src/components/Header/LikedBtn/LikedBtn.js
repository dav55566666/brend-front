"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLiked } from '../../../store/slices/liked/likedSlice'
import Link from 'next/link'
import { LikeIcon } from '../../../svg'
import { selectUsers } from '../../../store/slices/users/usersSlice'
import { fetchLiked } from '../../../store/slices/liked/likedApi'

function LikedBtn() {
  const {likedData, uuId} = useSelector(selectLiked)
  const {loginData} = useSelector(selectUsers)
  const [getLiked, setGetLiked] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    if(uuId || loginData.access_token) {
      if(!likedData.length) {
        if(!getLiked) {
          dispatch(fetchLiked({ userToken: loginData.access_token, guestUserId: uuId }))
          setGetLiked(true)
        }
      }
    }
  }, [likedData, uuId, loginData])
  return (
    <Link href={"/liked/"}>
      <LikeIcon />
      <span>Избранное</span>
      <span className='num'>{likedData?.length}</span>
    </Link>
  )
}

export default LikedBtn