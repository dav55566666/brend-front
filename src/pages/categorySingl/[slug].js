"use client";
import { Suspense, useEffect } from "react";
import CatalogSingle from "../../components/CatalogSingle/CatalogSingle"
import Products from "../../components/Products/Products";
import { useRouter } from 'next/router';

export default function CatalogSinglePage() {
    const router = useRouter();
    const { slug } = router.query;
  //  useEffect(() => {}, [slug])
    return (
        <>
            <Suspense >
                {slug && <CatalogSingle slug={slug}  />}
            </Suspense>
            <Products idx={0} fetch={true} />
            <Products idx={1} />
        </>
    );
}