import React from 'react'
import Registration from '../components/Registration/Registration'
import Brendcrumbs from '../components/Brendcrumbs/Brendcrumbs'

function page() {
    return (
        <>
            <Brendcrumbs title={"Регистрация"} />
            <Registration />
        </>
    )
}

export default page