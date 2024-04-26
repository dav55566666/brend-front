"use client";
import Basket from "../components/Basket/Basket";
import Brendcrumbs from "../components/Brendcrumbs/Brendcrumbs";

export default function BasketPgae() {
    return (
        <>
            <Brendcrumbs title={"Корзина"} />
            <Basket />
        </>
    )
}