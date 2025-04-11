import { Product } from '@/app/page';
import React from 'react'

export default function ProductCard({ product }:{product:Product}) {

    const { product_name, image, price, description, size, color, stock, gender } = product;

    return (
        <div className="product-card border border-neutral-200 m-2 p-4 rounded-xl">
            <div className="product-card__image">
                <img className='w-full rounded-md' src={image} alt={product_name} />
            </div>
            <div className="product-card__info">
                <h3 className='text-xl font-semibold mt-4 text-neutral-600'>{product_name}</h3>
                <p className='my-2 text-sm text-neutral-500'><span className='font-semibold'>Description:</span> {description}</p>
                <hr className='my-4 text-neutral-200'/>
                <p className='font-semibold text-neutral-600'>Price: BDT {price}.00</p>
                <p className='mt-1 font-normal text-neutral-500'>Color: {color.join(', ')}</p>
                <p className='mt-1 font-normal text-neutral-500'>Gender: {gender}</p>
                <p className='mt-1 font-normal text-neutral-500'>Size: {size.join(', ')}</p>
                <p className='mt-1 font-normal text-neutral-500'>Stock:
                    {stock ==="Available" && <span className='text-green-600'> Available</span>}
                    {stock ==="Coming Soon" && <span className='text-blue-600'> Coming Soon</span>}
                    {stock ==="Stock Out" && <span className='text-red-600'> Stock Out</span>}
                </p>
            </div>
        </div>
    )
}