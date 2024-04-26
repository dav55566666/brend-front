import React from 'react'
import ResetPass from '../components/ResetPass/ResetPass'
import Brendcrumbs from '../components/Brendcrumbs/Brendcrumbs'

export default function Page() {
    return (
        <>
            <Brendcrumbs title={"Изменить пароль"} links={[{name: "Личный Кабинет", link: "/personalRoom"}]}/>
            <ResetPass />
        </>
    )
}
