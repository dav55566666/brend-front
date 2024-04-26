import Brendcrumbs from "../components/Brendcrumbs/Brendcrumbs";
import Checkout from "../components/Checkout/Checkout";

export default function Page() {
    return (
        <>
            <Brendcrumbs title={"Оформление заказа"} links={[{name: "Корзина", link: "/basket"}]} />
            <Checkout />
        </>
    )
}