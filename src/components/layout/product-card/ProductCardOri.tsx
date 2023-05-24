import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { PlusCircleIcon as PlusCircleIconFilled, StarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import Category from '@/enums/category_enum';
import Product from '@/interfaces/product_interfaces';
import classNames from 'classnames';

export interface ProductCardProps {
    product: Product
    image: StaticImageData
    hasBorder?: boolean
}

const ProductCardOri = (props: ProductCardProps) => {
    const outlinePlus = <PlusCircleIcon className='w-9'></PlusCircleIcon>
    const filledPlus = <PlusCircleIconFilled className='w-9'></PlusCircleIconFilled>

    const [icon, setIcon] = useState(outlinePlus)


    return (
        <div className={classNames('text-white-plain w-full rounded-xl flex flex-col hover:scale-105 transition cursor-pointer rounded-2xl overflow-hidden',
            'bg-main from-main to-white-plain to-40% drop-shadow-xl',
            props.hasBorder && 'border-0 border-main'
        )}>
            <div className='p-3 flex-1 flex justify-center bg-white-plain'>
                <Image src={props.image} alt="Product Name" className='w-[45%] my-8 m-auto' />
            </div>
            <div className='p-5 relative'>
                <div className='flex justify-between items-start'>
                    <div className='flex flex-col mr-3'>
                        <span className='font-medium lg:text-lg !leading-snug inline-block'>{props.product.name}</span>
                        <div onClick={(e) => { console.log("test"); e.stopPropagation() }}><span className='font-light hover:underline text-sm lg:text-md'>{Category[props.product.type].toUpperCase()}</span></div>
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

export default ProductCardOri;
