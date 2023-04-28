import { PlusCircleIcon, StarIcon } from '@heroicons/react/24/outline'
import { PlusCircleIcon as PlusCircleIconFilled } from '@heroicons/react/24/solid';
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
    const outlinePlus = <PlusCircleIcon className='w-10'></PlusCircleIcon>
    const filledPlus = <PlusCircleIconFilled className='w-10'></PlusCircleIconFilled>

    const [icon, setIcon] = useState(outlinePlus)


    return (
        <div className='bg-white text-white w-72 h-96 rounded-xl flex flex-col hover:scale-105 transition cursor-pointer'>
            <div className='h-2/3'>
                <Image src={smartphone} alt="Product Name" className='w-1/2 m-auto mt-7' />
            </div>
            <div className='bg-main h-1/3 rounded-b-xl p-5 relative'>
                <div className='flex justify-between items-start'>
                    <div className='flex flex-col'>
                        <span className='font-medium text-lg'>{props.product.name}</span>
                        <Link href={''}><span className='font-light hover:underline'>{Category[props.product.type].toUpperCase()}</span></Link>
                    </div>
                    <div className='flex items-center'>
                        <StarIcon className='w-5 mr-1'></StarIcon>
                        <span className='text-lg'>{(Math.round(props.product.rating * 100) / 100).toFixed(2)}</span>
                    </div>
                </div>
                <div className='absolute right-5 bottom-2'>
                    <div className='rounded-full inline-block cursor-pointer'
                        onMouseEnter={() => { setIcon(filledPlus) }}
                        onMouseLeave={() => { setIcon(outlinePlus) }}>{icon}</div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
