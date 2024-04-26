"use client";
import { Suspense, useEffect } from "react";
import { useRouter } from 'next/router';
import Brandsingle from '../../components/Brandsingle/Brandsingle'

export default function Page() {
    const router = useRouter();
    const { slug } = router.query;
    useEffect(() => {}, [slug])
    return (
        <>
            <Suspense>
                {slug && <Brandsingle slug={slug} />}
            </Suspense>
        </>
    )
}