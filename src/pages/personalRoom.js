import MyRoom from "../components/MyRoom/MyRoom";
import Brendcrumbs from "../components/Brendcrumbs/Brendcrumbs";

export default function Page() {
    return (
        <>
            <Brendcrumbs title={"Личный Кабинет"} />
            <MyRoom />
        </>
    )
}