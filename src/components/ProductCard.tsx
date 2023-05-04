import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { PlusCircleIcon as PlusCircleIconFilled, StarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Category from '@/enums/category_enum';
import Product from '@/interfaces/product_interfaces';
import smartphone from './../assets/smartphone 1.png';

export interface ProductCardProps {
    product: Product
}

const ProductCard = (props: ProductCardProps) => {
    const outlinePlus = <PlusCircleIcon className='w-9'></PlusCircleIcon>
    const filledPlus = <PlusCircleIconFilled className='w-9'></PlusCircleIconFilled>

    const [icon, setIcon] = useState(outlinePlus)


    return (
        <div className='bg-white text-white w-full h-full rounded-xl flex flex-col hover:scale-105 transition cursor-pointer'>
            <div className='p-3 flex-1 flex justify-center'>
                <Image src={smartphone} alt="Product Name" className='w-[45%] my-5 m-auto' />
            </div>
            <div className='bg-main rounded-b-xl p-5 relative'>
                <div className='flex justify-between items-start'>
                    <div className='flex flex-col mr-3'>
                        <span className='font-medium lg:text-lg !leading-snug inline-block'>{props.product.name}</span>
                        <Link href={''}><span className='font-light hover:underline text-sm lg:text-md'>{Category[props.product.type].toUpperCase()}</span></Link>
                    </div>
                    <div className='flex flex-col items-end'>
                        <div className='flex items-center'>
                            <StarIcon className='w-5 h-5 mr-1 mb-1'></StarIcon>
                            <span className='text-lg'>{(Math.round(props.product.rating * 100) / 100).toFixed(2)}</span>
                        </div>
                        <div className='rounded-full inline-block cursor-pointer mt-3'
                            onMouseEnter={() => { setIcon(filledPlus) }}
                            onMouseLeave={() => { setIcon(outlinePlus) }}>
                            {icon}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductCard;
