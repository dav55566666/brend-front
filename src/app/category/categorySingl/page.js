'use client'

import React from "react";
import CatalogSingle from "../../components/CatalogSingle/CatalogSingle"

export default function CatalogSinglePage(cnt) {
    const {searchParams} = cnt
    console.log(cnt,'1111s')
    ///const categoryId = searchParams.categoryId
    return (
        <>
            <CatalogSingle categoryId={ Object.keys(searchParams).length > 0 ? searchParams.categoryId : 0}/>  
        </>
    );
}