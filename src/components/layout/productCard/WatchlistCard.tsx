import Product from "@/interfaces/productInterface"
import { StarIcon, TrashIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"

export interface WatchlistCardProps {
    product: Product
    onDeleteClick: (...args: any[]) => void
}

const WatchlistCard = (props: WatchlistCardProps) => {
    return (
        <Link href={"/products/details/" + props.product.productId}
            className="border border-main relative h-[20vh] p-5 flex w-full border-b-0 last:border-b hover:bg-gray-200 first:rounded-t-xl last:rounded-b-xl">
            <div className="basis-1/3 relative">
                <Image src={props.product.coverImage!} fill alt="Product Name" className='w-[45%] object-contain' />
            </div>
            <div className="grow">
                <div className="flex justify-between">
                    <div>
                        <div className="text-main text-xl font-semibold">{props.product.name}</div>
                        <Link href={'/products/' + props.product.category?.toString().toLowerCase()}>
                            <span className='font-light hover:underline text-sm lg:text-md '>{props.product.category && props.product.category}</span>
                        </Link>
                    </div>
                    <TrashIcon className="w-7 self-start cursor-pointer text-red-500"
                        onClick={(e) => {
                            e.preventDefault();
                            props.onDeleteClick();
                        }}
                    ></TrashIcon>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center text-yellow-500'>
                        <StarIcon className='w-5 h-5 mr-2'></StarIcon>
                        {props.product.rating ?
                            <div>
                                <span>
                                    {props.product.rating?.toFixed(2)}
                                </span>
                                <span className='text-gray-400'>{" (" + props.product.ratingCount + ")"}</span>
                            </div>
                            : "-"}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default WatchlistCard