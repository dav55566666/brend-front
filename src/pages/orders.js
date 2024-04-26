import Brendcrumbs from "../components/Brendcrumbs/Brendcrumbs";
import OrderStory from "../components/OrderStory/OrderStory";

export default function Page() {
    return (
        <>
            <Brendcrumbs title={"Мои заказы"} />
            <OrderStory />
        </>
    )
}