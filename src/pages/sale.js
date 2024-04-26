import React from 'react'
import Sale from '../components/Sale/Sale'
import Brendcrumbs from '../components/Brendcrumbs/Brendcrumbs'

export default function Page() {
    return (
        <>
            <Brendcrumbs title={"Акции"} />
            <Sale fetch={true} idx={0}/>
        </>
    )
}
