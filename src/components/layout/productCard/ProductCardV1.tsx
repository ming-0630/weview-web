import { PlusCircleIcon, StarIcon } from '@heroicons/react/24/outline'
import { PlusCircleIcon as PlusCircleIconFilled, } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Product from '@/interfaces/productInterface';
import classNames from 'classnames';

export interface ProductCardProps {
    product: Product
    hasBorder?: boolean
}

const ProductCardV1 = (props: ProductCardProps) => {
    const outlinePlus = <PlusCircleIcon className='w-9'></PlusCircleIcon>
    const filledPlus = <PlusCircleIconFilled className='w-9'></PlusCircleIconFilled>

    const [icon, setIcon] = useState(outlinePlus)


    return (
        <Link href={"/products/details/" + props.product.productId}>
            <div className={classNames('text-black w-full h-full p-5 xl:p-7 rounded-xl flex flex-col hover:scale-105 transition cursor-pointer rounded-2xl overflow-hidden',
                'bg-white-plain shadow-main shadow-lg'
            )}>

                <div className='relative mb-5'>
                    <div className='flex flex-col justify-between items-start text-main'>
                        <div className='flex flex-col mr-3'>
                            <span className='font-bold lg:text-lg !leading-snug inline-block'>{props.product.name}</span>
                            <Link href={'/products/' + props.product.category?.toString().toLowerCase()}><span className='font-light hover:underline text-sm lg:text-md '>{props.product.category && props.product.category}</span></Link>
                        </div>
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex items-center text-yellow-500'>
                                <StarIcon className='w-5 h-5 mr-1 '></StarIcon>
                                {/* <span className='text-lg'>{props.product.reviews ? (Math.round(props.product.rating * 100) / 100).toFixed(2) : "0.00"}</span> */}
                                <span>0.00</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-grow justify-center bg-white-plain relative'>
                    <Image src={props.product.coverImage ? props.product.coverImage : ""} alt="Product Name" fill className='w-[45%] object-contain' />
                </div>
                <div className='flex items-center mt-7 justify-end'>
                    {/* <div className='flex items-center'>
                    <CurrencyDollarIcon className='w-5 h-5 mr-1'></CurrencyDollarIcon>
                    <div>RM 100 - RM 200</div>
                </div> */}
                    <div className='rounded-full inline-block cursor-pointer text-main self-end'
                        onMouseEnter={() => { setIcon(filledPlus) }}
                        onMouseLeave={() => { setIcon(outlinePlus) }}
                        onClick={(e) => {
                            e.preventDefault();
                        }}>
                        {icon}
                    </div>
                </div>
            </div>
        </Link >
    );
}

export default ProductCardV1;
