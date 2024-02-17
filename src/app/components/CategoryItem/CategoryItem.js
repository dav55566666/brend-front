import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CategoryItem({title, img, id}) {
    return (
        <div className="category-item">
            <Link href={{pathname: `/category/categorySingl`, query: {categoryId: id}}} className="category-item__img"><img src={img} alt={title}/></Link>
            <h3><Link href={{pathname: `/category/categorySingl`, query: {categoryId: id}}}>{title}</Link></h3>
        </div>
    )
}
