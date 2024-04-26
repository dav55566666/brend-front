'use client'

import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Custom404() {
    const [refresh, setRefresh] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (!refresh) {
            setRefresh(true)
        }
        if(router.asPath) {
            let segments = router.asPath.split('/');
            let firstSegment = segments[1];
            if(firstSegment === "categorySingl" || firstSegment === "newsSingl" || firstSegment === "brandsingle" || firstSegment === "product" || firstSegment === "orderSingle") {
                router.push(router.asPath)
            }
        }
    }, [refresh])
    return (
        <h1>asokd;al</h1>
    )
}