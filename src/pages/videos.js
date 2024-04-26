import React from 'react'
import Brendcrumbs from '../components/Brendcrumbs/Brendcrumbs'
import VideosPage from '@/components/VideosPage/VideosPage'

export default function Page() {
    return (
        <>
            <Brendcrumbs title={"Видеообзоры"} />
            <VideosPage/>
        </>
    )
}
