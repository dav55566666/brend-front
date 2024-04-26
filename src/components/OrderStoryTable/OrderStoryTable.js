"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsers } from '../../store/slices/users/usersSlice'
import { fetchOrderSingle, fetchOrders } from '../../store/slices/users/usersApi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function OrderStoryTable() {
    const dispatch = useDispatch()
    const {loginData, usersData, ordersStoryData} = useSelector(selectUsers)
    const [getOrders, setGetOrders] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if(!getOrders) {
            if(loginData.access_token) {
                dispatch(fetchOrders({userToken: loginData.access_token, limit:  20, page: 1}))
                setGetOrders(true)
            }
        }
    }, [getOrders, ordersStoryData, loginData])
    return (
        <table className="orders-table" cellSpacing={0} cellPadding={0}>
            <tbody>
                <tr>
                    <td>
                        <p>№ Заказа</p>
                    </td>
                    <td>
                        <p>Количество</p>
                    </td>
                    <td>
                        <p>Статус</p>
                    </td>
                    <td>
                        <p>Всего</p>
                    </td>
                    <td>
                        <p>Добавлено</p>
                    </td>
                    <td>
                        <p>Подробнее</p>
                    </td>
                </tr>
                {
                    ordersStoryData.map((el, idx) => (
                        <tr key={el.id} >
                            <td>
                            <Link href={`/orderSingle/${el.id}`} className='alllink' onClick={() => {
                            dispatch(fetchOrderSingle({userToken: loginData.access_token, orderId: el.id}))
                        }}></Link>
                                <p>#{el.id}</p>
                            </td>
                            <td>
                                <p>{el.count}</p>
                            </td>
                            <td>
                                <p>{el.status === "1" ? "В обработке" : el.status === "2" ? "Забронирован" : "Доставлен"}</p>
                            </td>
                            <td>
                                <p>{el.total} ₽</p>
                            </td>
                            <td>
                                <p>{el.created}</p>
                            </td>
                            <td>
                                <button>
                                    <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.125 9.5C8.125 8.51628 8.9645 7.71875 10 7.71875C11.0355 7.71875 11.875 8.51628 11.875 9.5C11.875 10.4837 11.0355 11.2812 10 11.2812C8.9645 11.2812 8.125 10.4837 8.125 9.5Z" fill="white" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.6665 9.50008C1.6665 10.7979 2.02064 11.235 2.72891 12.1092C4.14314 13.8546 6.51493 15.8334 9.99984 15.8334C13.4848 15.8334 15.8565 13.8546 17.2708 12.1092C17.979 11.235 18.3332 10.7979 18.3332 9.50008C18.3332 8.20222 17.979 7.76517 17.2708 6.89101C15.8565 5.14557 13.4848 3.16675 9.99984 3.16675C6.51493 3.16675 4.14314 5.14557 2.72891 6.89101C2.02064 7.76517 1.6665 8.20222 1.6665 9.50008ZM9.99984 6.53133C8.27395 6.53133 6.87484 7.86048 6.87484 9.50008C6.87484 11.1397 8.27395 12.4688 9.99984 12.4688C11.7258 12.4688 13.1248 11.1397 13.1248 9.50008C13.1248 7.86048 11.7258 6.53133 9.99984 6.53133Z" fill="white" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    )
}

export default OrderStoryTable