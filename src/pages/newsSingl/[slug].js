"use client"
import { Suspense, useEffect } from "react";
import NewsSingl from "../../components/NewsSingl/NewsSingl";
import HomeNews from "../../components/HomeNews/HomeNews"
import { useRouter } from "next/router";

export default function NewsSinglPage() {
    const router = useRouter()
    const {slug} = router.query
    useEffect(() => {}, [slug])
    return (
        <>
            <Suspense>
                {slug && <NewsSingl slug={slug} />}
            </Suspense>
            <HomeNews />
        </>
    )
}