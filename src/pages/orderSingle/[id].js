"use client"
import React, { Suspense, useEffect } from 'react'
import OrderSingle from '../../components/OrderSingle/OrderSingle'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectUsers } from '../../store/slices/users/usersSlice'

function OrderSinglPage() {
    const router = useRouter()
    const { id } = router.query
    const { usersData } = useSelector(selectUsers)
    useEffect(() => {
        if (!usersData.name) {
            router.push("/")
            return
        }
    }, [id])
    return (
        <>
            <Suspense>
                {id && <OrderSingle id={id} />}
            </Suspense>
        </>
    )
}

export default OrderSinglPage