import Product from '@/interfaces/productInterface';
import { addToWatchlist } from '@/services/user/services';
import { useAuthStore } from '@/states/authStates';
import { useGlobalStore } from '@/states/globalStates';
import CustomToastError from '@/utils/CustomToastError';
import useStore from '@/utils/useStore';
import { HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon, HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

export interface ProductCardProps {
    product: Product
    onWatchlistClick: (...args: any[]) => void
}

const ProductCardOri = (props: ProductCardProps) => {

    return (
        <Link href={"/products/details/" + props.product.productId} className={classNames("text-white-plain w-full h-full flex flex-col",
            "hover:scale-105 transition cursor-pointer rounded-2xl overflow-hidden block",
            'bg-main drop-shadow-xl',
            "w-[15rem] 2xl:w-[17rem] h-[20rem] 2xl:h-[22rem]"
        )}>
            <div className='flex flex-grow justify-center bg-white-plain items-center'>
                <div className='relative w-[80%] h-[80%] '>
                    <Image src={props.product.coverImage ? props.product.coverImage : ""}
                        alt="Product Name" fill className=' object-contain' />
                </div>
            </div>
            <div className='p-5 relative'>
                <div className='flex justify-between items-start'>
                    <div className='flex flex-col mr-3'>
                        <span className='font-medium lg:text-lg !leading-snug inline-block'>{props.product.name}</span>
                        <div onClick={(e) => { console.log("test"); e.stopPropagation() }}><span className='font-light hover:underline text-sm lg:text-md'>{props.product.category}</span></div>
                    </div>
                    <div className='flex flex-col items-end'>
                        <div className='flex items-center'>
                            <StarIcon className='w-5 h-5 mr-1 mb-1'></StarIcon>
                            {props.product.rating ?
                                <div className='flex gap-1'>
                                    <span>
                                        {props.product.rating?.toFixed(2)}
                                    </span>
                                    <span>{" (" + props.product.ratingCount + ")"}</span>
                                </div>
                                : "-"}
                        </div>
                        <div className='mt-4'>
                            {
                                props.product.watchlisted ?
                                    <div className='rounded-full inline-block cursor-pointer text-white self-end group'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            props.onWatchlistClick();
                                        }}>
                                        {<HeartIconFilled className='w-7 group-hover:opacity-80'></HeartIconFilled>}
                                    </div>
                                    : <div className='rounded-full inline-block cursor-pointer text-white self-end group'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            props.onWatchlistClick();
                                        }}>

                                        {<HeartIcon className='w-7 group-hover:hidden'></HeartIcon>}
                                        {<HeartIconFilled className='w-7 hidden group-hover:block'></HeartIconFilled>}
                                    </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCardOri;
