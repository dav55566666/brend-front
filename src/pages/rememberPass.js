import React from 'react'
import Brendcrumbs from '../components/Brendcrumbs/Brendcrumbs'
import RememberPass from '../components/RememberPass/RememberPass'

export default function Page() {
    return (
        <>
            <Brendcrumbs title={"Забыли пароль"}/>
            <RememberPass />
        </>
    )
}
