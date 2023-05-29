import ProductDetailsBg from "@/components/ui/ProductDetailsBg";
import Product from "@/interfaces/productInterface";
import { getProductDetails } from "@/services/product/services";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductDetailsPageProps {
    id: string | string[]
}

const ProductDetailsPage = (props: ProductDetailsPageProps) => {
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(false);

    const getProduct = () => {
        setIsLoading(true);
        const fetchData = async () => {
            let response = await getProductDetails(props.id.toString());

            if (response && response.data) {
                setProduct(response.data);
            }
        }
        fetchData().catch(console.error)
        setIsLoading(false);
    }

    // On Props change
    useEffect(() => {
        getProduct();
    }, [props])

    return (
        <div className="min-h-[calc(100vh_-_5rem)]">
            <div className="h-[calc(100vh_-_5rem)] w-full overflow-hidden relative">
                <ProductDetailsBg className="w-full absolute" viewBox="0 0 1920 1080"></ProductDetailsBg>
                <div className="z-10 relative flex h-full items-center px-32 gap-20">
                    <div className="bg-white rounded-3xl basis-1/4 h-[50vh]">
                        test
                    </div>
                    <div className="flex flex-col grow gap-2 text-white">
                        <span className="text-7xl font-semibold">{product?.name}</span>
                        <Link href={'/products/' + product?.category?.toString().toLowerCase()} className="mt-2">
                            <span className='font-medium text-3xl hover:underline uppercase opacity-70'>
                                {product?.category && product.category}
                            </span>
                        </Link>
                        <hr className="border-none h-1 bg-white/50 rounded my-2"></hr>
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-1 items-center">
                                <div className="flex gap-2">
                                    <StarIcon className='w-7 h-7'></StarIcon>
                                    <StarIcon className='w-7 h-7'></StarIcon>
                                    <StarIcon className='w-7 h-7'></StarIcon>
                                    <StarIcon className='w-7 h-7'></StarIcon>
                                    <StarIcon className='w-7 h-7'></StarIcon>
                                </div>
                                <div className="text-xl">{"( 6.9k Ratings )"}</div>
                            </div>
                            <button className="flex text-main bg-white p-5 rounded-2xl items-center text-xl font-semibold">
                                <ArrowDownIcon className="w-7 mr-2"></ArrowDownIcon>
                                Show Reviews
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex justify-center p-10">
                <div className="font-semibold text-3xl">Product Details</div>
            </div>
        </div>
    );
}

export default ProductDetailsPage;
