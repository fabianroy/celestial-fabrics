import { Product } from '@/app/page';
import React from 'react'

export default function ProductCard({ product }:{product:Product}) {

    const { product_name, image, price, description, size, color, stock } = product;

    return (
        <div className="product-card border border-neutral-200 m-2 p-4 rounded-xl">
            <div className="product-card__image">
                <img className='w-full rounded-md' src={image} alt={product_name} />
            </div>
            <div className="product-card__info">
                <h3 className='text-xl font-semibold mt-4 text-neutral-800'>{product_name}</h3>
                <p className='my-2 text-sm text-neutral-700'><span className='font-semibold'>Description:</span> {description}</p>
                <hr className='my-4 text-neutral-200'/>
                <p className='font-semibold text-neutral-800'>Price: BDT {price}</p>
                <p className='mt-1 font-normal text-neutral-700'>Size: {size.join(', ')}</p>
                <p className='mt-1 font-normal text-neutral-700'>Color: {color.join(', ')}</p>
                <p className='mt-1 font-normal text-neutral-700'>Stock: <span className='text-green-600'>{stock}</span></p>
            </div>
        </div>
    )
}