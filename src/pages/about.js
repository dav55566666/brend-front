import AbautPage from "../components/AbautPage/AbautPage";
import Brendcrumbs from "../components/Brendcrumbs/Brendcrumbs";
import Products from "../components/Products/Products";

export default function Page() {
    return (
        <>
            <Brendcrumbs title={"О компании"} />
            <AbautPage />
            <Products idx={0} fetch={true} />
        </>
    )
}