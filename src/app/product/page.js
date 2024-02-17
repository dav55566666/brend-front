'use client'
import ProductSingle from "../components/ProductSingle/ProductSingle";

export default function ProductSinglPage(params) {
    const {searchParams} = params
   /// const productId = searchParams.productId
    return (
        <ProductSingle productId={ Object.keys(searchParams).length > 0 ? searchParams.productId : 0} />
    )
}