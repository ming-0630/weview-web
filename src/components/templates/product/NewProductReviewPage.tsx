import ProductDetailsBg from "@/components/ui/ProductDetailsBg";
import Product from "@/interfaces/productInterface";
import { getProductDetails } from "@/services/product/services";
import { useEffect, useRef, useState } from "react";
import { SortProps } from "./ProductListPage";
import { useAuthStore } from "@/states/authStates";
import Carousel from "@/components/ui/Carousell";
import Image from "next/image";
import classNames from "classnames";
import { Rating } from "@mui/material";
import FileUpload from "@/components/ui/FileUpload";
import ReviewBlock from "../review/ReviewBlock";
import Review from "@/interfaces/reviewInterface";
import CustomToastError from "@/utils/CustomToastError";

interface ProductPageProps {
    id: string | string[]
}

const NewProductReviewPage = (props: ProductPageProps) => {
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(false);
    const [sortCategory, setSortCategory] = useState<SortProps>({ by: "name", direction: "asc" });
    const [step, setStep] = useState(0);

    const [hoverRating, setHoverRating] = useState(-1);

    const [review, setReview] = useState<Review>({
        title: "",
        description: "",
        price: 0,
        rating: 3,
        images: []
    })

    const user = useAuthStore((state) => state.loggedInUser);

    const getProduct = () => {
        setIsLoading(true);
        const fetchData = async () => {
            let response = await getProductDetails(props.id.toString());

            if (response && response.data) {
                setProduct(response.data);
                console.log(response.data)
            }
        }
        fetchData().catch(console.error)
        setIsLoading(false);
    }

    // On Props change
    useEffect(() => {
        if (props.id) {
            getProduct();
        }
    }, [props])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!product || !product.productId) {
            CustomToastError("Product not found!")
            return;
        }

        if (!review.rating) {
            CustomToastError("No Rating!")
            return;
        }

        if (!review.price) {
            CustomToastError("No Price Entered!")
            return;
        }

        if (!review.description || !review.title) {
            CustomToastError("Missing fields!")
            return;
        }

        const data = new FormData();
        if (review.images) {
            review.images.forEach(img => {
                data.append('uploadedImages', img)
            });
        }

        data.append("title", review.title ?? "");
        data.append("description", review.description ?? "");
        data.append("rating", review.rating.toString());
        data.append("price", review.price.toString());
        data.append("productId", product.productId);

        // const response = await addProduct(data);
    }

    const ratingLabels: { [index: string]: string } = {
        1: 'Bad',
        2: 'Unsatisfactory',
        3: 'Decent',
        4: 'Good',
        5: 'Excellent',
    };

    function getLabelText(value: number) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${ratingLabels[value]}`;
    }

    const setImages = (images: string[]) => {
        setReview({ ...review, images: images })
    }

    const handleStep = (step: number) => {
        if (step != 3) {
            setStep(step);
            return;
        }

        // Check fields 

        if (!review.description || !review.title || review.price == 0) {
            CustomToastError("Missing fields!")
            setStep(1);
            return;
        } else {
            setStep(step);
        }
    }

    return (
        <div className="min-h-[calc(100vh_-_5rem)]">
            <div className="h-[calc(100vh_-_5rem)] w-full overflow-hidden relative">
                <ProductDetailsBg className="w-full absolute" viewBox="0 0 1920 1080"></ProductDetailsBg>
                <div className="relative flex text-white h-full">
                    <div className="flex flex-col p-16">
                        <div className="w-[30vw]">
                            <div className="font-bold text-7xl self-start">Write a Review</div>
                            <hr className="border-none h-1 bg-white/50 rounded my-2"></hr>
                        </div>

                        <div className="flex h-full text-5xl font-medium">
                            <div className="flex flex-col items-center h-full">
                                <div className="flex flex-col my-auto gap-10 steps">
                                    <div className={classNames("cursor-pointer flex", step === 0 && "drop-shadow-white")}
                                        onClick={() => { handleStep(0) }}>
                                        <div className={classNames("mr-3", step !== 0 && "invisible")}>
                                            •
                                        </div>
                                        Product
                                    </div>
                                    <div className={classNames("cursor-pointer flex", step === 1 && "drop-shadow-white")}
                                        onClick={() => { handleStep(1) }}>
                                        <div className={classNames("mr-3", step !== 1 && "invisible")}>
                                            •
                                        </div>
                                        Rating
                                    </div>
                                    <div className={classNames("cursor-pointer flex", step === 2 && "drop-shadow-white")}
                                        onClick={() => { handleStep(2) }}>
                                        <div className={classNames("mr-3", step !== 2 && "invisible")}>
                                            •
                                        </div>
                                        Images
                                    </div>
                                    <div className={classNames("cursor-pointer flex", step === 3 && "drop-shadow-white")}
                                        onClick={() => { handleStep(3) }}>
                                        <div className={classNames("mr-3", step !== 3 && "invisible")}>
                                            •
                                        </div>
                                        Submit
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grow bg-[#F7F7F7] flex justify-center items-center text-black">
                        <div className={classNames("opacity-100 transition duration-300 ease-in-out absolute", step !== 0 && "!opacity-0 invisible")}>
                            <div className="rounded-2xl p-10 w-[50vw]">
                                <div className="flex flex-col">
                                    <span className="text-5xl font-semibold">{product?.name}</span>
                                    <span className='font-medium text-2xl uppercase opacity-70 mb-10'>
                                        {product?.category && product.category}
                                    </span>
                                    <Carousel align='start' slidesToScroll={1} hasButtons loop>
                                        {product?.images?.map((img, i) => {
                                            return (
                                                <div className="h-[50vh] flex-[0_0_100%] relative" key={i}>
                                                    <Image src={img} alt={""} fill className="object-contain p-10" />
                                                </div>
                                            )
                                        })}
                                    </Carousel>
                                    <div className="self-end mt-10">
                                        <div className="btn btn-primary text-white" onClick={() => { handleStep(1) }}>Next</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={classNames("opacity-100 transition duration-300 ease-in-out absolute", step !== 1 && "!opacity-0 invisible")}>
                            <div className="text-main p-10 w-[50vw]">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-10">
                                        <Rating
                                            className="text-7xl"
                                            name="hover-feedback"
                                            value={review.rating}
                                            precision={1}
                                            getLabelText={getLabelText}
                                            onChange={(event, newValue) => {
                                                setReview({ ...review, rating: newValue! });
                                            }}
                                            onChangeActive={(event, newHover) => {
                                                setHoverRating(newHover);
                                            }}
                                        />
                                        {review.rating && (
                                            <div className="text-5xl font-semibold">{ratingLabels[hoverRating !== -1 ? hoverRating : review.rating]}</div>
                                        )}
                                    </div>

                                    <hr className="border-none h-0.5 bg-gray-dark/50 rounded mb-5 mt-10"></hr>
                                    <div className="flex flex-col bg-transparent gap-5" data-theme="cupcake">

                                        <div>
                                            <label className="label">
                                                <span className="label-text">Price </span>
                                            </label>
                                            <input className="input input-bordered border-main focus:outline-main bg-transparent rounded-lg w-[20%]"
                                                value={review.price}
                                                onChange={(e) => { setReview({ ...review, price: parseInt(e.target.value) }); }}
                                            ></input>
                                        </div>

                                        <div>
                                            <label className="label">
                                                <span className="label-text">Title </span>
                                            </label>
                                            <input className="input input-bordered border-main focus:outline-main bg-transparent rounded-lg w-full"
                                                value={review.title}
                                                onChange={(e) => { setReview({ ...review, title: e.target.value }); }}
                                            ></input>
                                        </div>

                                        <div>
                                            <label className="label">
                                                <span className="label-text">Description </span>
                                            </label>
                                            <textarea className="textarea textarea-bordered textarea-primary h-40 w-full rounded-xl bg-transparent"
                                                value={review.description}
                                                onChange={(e) => { setReview({ ...review, description: e.target.value }); }}
                                            ></textarea>
                                        </div>


                                    </div>

                                    <div className="flex justify-between mt-5">
                                        <div className="btn btn-primary text-white" onClick={() => { handleStep(0) }}>Prev</div>
                                        <div className="btn btn-primary text-white" onClick={() => { handleStep(2) }}>Next</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={classNames("opacity-100 transition duration-300 ease-in-out absolute", step !== 2 && "!opacity-0 invisible")}>
                            <div className="rounded-2xl text-main p-10 w-[50vw]">
                                <div className="flex flex-col items-end">
                                    <FileUpload
                                        files={review.images ?? []}
                                        setFiles={setImages}
                                    ></FileUpload>
                                    <div className="flex w-full justify-between mt-5">
                                        <div className="btn btn-primary text-white" onClick={() => { handleStep(1) }}>Prev</div>
                                        <div className="btn btn-primary text-white" onClick={() => { handleStep(3) }}>Next</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={classNames("opacity-100 transition duration-300 ease-in-out absolute", step !== 3 && "!opacity-0 invisible")}>
                            <div className="text-3xl mb-3 text-main">Preview</div>
                            <div className="text-main w-[50vw] overflow-y-auto max-h-[60vh] border border-main rounded-lg p-10 pb-3">
                                <ReviewBlock disabled review={review} user={user}></ReviewBlock>
                            </div>
                            <div className="flex w-full justify-between mt-5">
                                <div className="btn btn-primary text-white" onClick={() => { handleStep(2) }}>Prev</div>
                                <div className="btn btn-primary text-white" onClick={() => { handleSubmit }}>Submit</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewProductReviewPage;
