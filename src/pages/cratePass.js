import Brendcrumbs from "@/components/Brendcrumbs/Brendcrumbs";
import CreatePass from "@/components/CreatePass/CreatePass";

export default function CreatePassPage() {
    return (
        <>
            <Brendcrumbs title={"Сброс пароля"} />
            <CreatePass />
        </>
    )
}