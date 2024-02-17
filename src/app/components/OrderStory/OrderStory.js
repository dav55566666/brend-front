import React from 'react'
import MyRoomMenu from '../MyRoomMenu/MyRoomMenu'
import OrderStoryTable from '../OrderStoryTable/OrderStoryTable'
import Pagination from '../Pagination/Pagination'

function OrderStory() {
    return (
        <section class="order-story">
            <div class="order-story__container _container">
                <h1>Оформление заказа</h1>
                <div class="order-story__flex">
                    <MyRoomMenu />
                    <div class="order-story__right">
                        <h2>Ваши заказы</h2>
                        <OrderStoryTable />
                        <Pagination />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderStory