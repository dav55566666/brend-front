import Brendcrumbs from "../components/Brendcrumbs/Brendcrumbs";
import Callback from "../components/Callback/Callback";
import Contacts from "../components/Contacts/Contacts";

export default function page () {
    return (
        <>
            <Brendcrumbs title={"Контакты"} />
            <Callback />
            <Contacts />
        </>
    )
}