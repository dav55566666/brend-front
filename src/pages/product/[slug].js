"use client";
import { Suspense, useEffect } from "react";
import ProductSingle from "../../components/ProductSingle/ProductSingle";
import Products from "../../components/Products/Products";
import { useRouter } from 'next/router';
export default function ProductSinglPage() {
    const router = useRouter();
    const { slug } = router.query;
    useEffect(() => {
    }, [slug])
    return (
        <>
            <Suspense>
                {
                    slug && <ProductSingle slug={slug} />
                }
            </Suspense>
            <Products idx={0} fetch={true} />
            <Products idx={1} />
        </>
    )
}