import Carousel from "@/components/ui/Carousell";
import FileUpload from "@/components/ui/FileUpload";
import ProductDetailsBg from "@/components/ui/ProductDetailsBg";
import Product from "@/interfaces/productInterface";
import Review from "@/interfaces/reviewInterface";
import { getOneProduct } from "@/services/product/services";
import { addReview } from "@/services/review/services";
import { useAuthStore } from "@/states/authStates";
import { useGlobalStore } from "@/states/globalStates";
import CustomToastError from "@/utils/CustomToastError";
import useStore from "@/utils/useStore";
import { CubeIcon, MagnifyingGlassCircleIcon, PencilSquareIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Rating, Stepper } from "@mantine/core";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReviewBlock from "./ReviewBlock";


interface ProductPageProps {
    id: string | string[]
}

const NewReviewPage = (props: ProductPageProps) => {
    const [product, setProduct] = useState<Product>();
    const [step, setStep] = useState(0);

    const loadingHandler = useGlobalStore((state) => state.loadingHandler)

    const [hoverRating, setHoverRating] = useState(-1);
    const router = useRouter();

    const [review, setReview] = useState<Review>({
        title: "",
        description: "",
        price: 0,
        rating: 3,
        images: [],
        verified: true
    })

    const user = useStore(useAuthStore, ((state) => state.loggedInUser));

    const getProduct = () => {
        loadingHandler.open();
        const fetchData = async () => {
            let response = await getOneProduct(props.id.toString());

            if (response && response.data) {
                setProduct(response.data);
            }
        }
        fetchData().catch(console.error)
        loadingHandler.close();
    }

    // On Props change
    useEffect(() => {
        if (props.id) {
            getProduct();
        }
    }, [props])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            loadingHandler.open();

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
            if (review.tempImages) {
                review.tempImages.forEach(img => {
                    data.append('uploadedImages', img)
                });
            }

            data.append("title", review.title ?? "");
            data.append("description", review.description ?? "");
            data.append("rating", review.rating.toString());
            data.append("price", review.price.toString());
            data.append("productId", product.productId);
            data.append('userId', user!.id);

            // for (var pair of data.entries()) {
            //     console.log(pair[0] + ', ' + pair[1]);
            // }

            const response = await addReview(data);

            if (response && response.status == 200) {
                toast.success("Review created successfully!");
                router.push({
                    pathname: '/products/details/' + product.productId,
                })
            }
        } catch (e) {
            console.log(e)
        } finally {
            loadingHandler.close();
        }
    }

    const ratingLabels: { [index: string]: string } = {
        1: 'Bad',
        2: 'Unsatisfactory',
        3: 'Decent',
        4: 'Good',
        5: 'Excellent',
    };

    const setImages = (images: File[]) => {
        console.log(images)
        setReview({ ...review, tempImages: images })
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
        <div className="h-[calc(100vh_-_5rem)] w-full overflow-hidden relative">
            <ProductDetailsBg className="w-full h-full absolute" viewBox="0 0 1920 1080"
                preserveAspectRatio="xMaxYMax slice"></ProductDetailsBg>
            <div className="relative flex text-white h-full">
                <div className="flex flex-col p-16">
                    <div className="w-[30vw]">
                        <div className="font-bold text-5xl 3xl:text-7xl self-start">Write a Review</div>
                        <hr className="border-none h-1 bg-white/50 rounded my-2"></hr>
                    </div>

                    <Stepper active={step} onStepClick={handleStep} orientation="vertical"
                        className="grow mt-10"
                        classNames={{
                            steps: 'h-full flex flex-col',
                            step: 'grow',
                            stepLabel: 'text-white font-bold',
                            stepDescription: 'text-white/80'
                        }}>
                        <Stepper.Step
                            icon={<CubeIcon className="w-5"></CubeIcon>}
                            label="Product"
                            description="Verfiy product to review"
                            color="green"
                            completedIcon={<CheckIcon className="w-5"></CheckIcon>}>
                        </Stepper.Step>
                        <Stepper.Step
                            icon={<PencilSquareIcon className="w-5"></PencilSquareIcon>}
                            label="Review"
                            description="Creating your review"
                            color="green"
                            completedIcon={<CheckIcon className="w-5"></CheckIcon>}>
                        </Stepper.Step>
                        <Stepper.Step
                            icon={<PhotoIcon className="w-5"></PhotoIcon>}
                            label="Images"
                            description="Upload images (if any)"
                            color="green"
                            completedIcon={<CheckIcon className="w-5"></CheckIcon>}>
                        </Stepper.Step>
                        <Stepper.Step
                            icon={<MagnifyingGlassCircleIcon className="w-5"></MagnifyingGlassCircleIcon>}
                            label="Preview"
                            description="Double check your review!"
                            color="green"
                            completedIcon={<CheckIcon className="w-5"></CheckIcon>}>
                        </Stepper.Step>
                        <Stepper.Completed>
                        </Stepper.Completed>
                    </Stepper>

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
                                            <div className="h-[40vh] 3xl:h-[50vh] flex-[0_0_100%] relative" key={i}>
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
                                    <Rating value={review.rating}
                                        size="xl"
                                        onChange={(value) => {
                                            setReview({ ...review, rating: value! });
                                        }}
                                        onHover={(value) => {
                                            setHoverRating(value)
                                        }} />
                                    {review.rating && (
                                        <div className="text-5xl font-semibold">{ratingLabels[hoverRating !== -1 ? hoverRating : review.rating]}</div>
                                    )}
                                </div>

                                <hr className="border-none h-0.5 bg-gray-dark/50 rounded mb-5 mt-10"></hr>
                                <div className="flex flex-col bg-transparent gap-2 3xl:gap-5" data-theme="cupcake">

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Price </span>
                                        </label>
                                        <input className="input input-bordered input-sm border-main focus:outline-main bg-transparent rounded-lg w-[20%]"
                                            value={review.price === 0 ? '' : review.price}
                                            placeholder="RM"
                                            type="number"
                                            min="1" max="10000.00"
                                            step="0.01"
                                            onChange={(e) => { setReview({ ...review, price: parseInt(e.target.value) }); }}
                                        ></input>
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Title </span>
                                        </label>
                                        <input className="input input-bordered input-sm border-main focus:outline-main bg-transparent rounded-lg w-full"
                                            value={review.title}
                                            onChange={(e) => { setReview({ ...review, title: e.target.value }); }}
                                        ></input>
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Description </span>
                                        </label>
                                        <textarea className="textarea textarea-bordered textarea-primary h-32 3xl:h-40 w-full rounded-xl bg-transparent"
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
                                    files={review.tempImages ?? []}
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
                            <ReviewBlock isPreview review={review} user={user}></ReviewBlock>
                        </div>
                        <div className="flex w-full justify-between mt-5">
                            <div className="btn btn-primary text-white" onClick={() => { handleStep(2) }}>Prev</div>
                            <div className="btn btn-primary text-white" onClick={handleSubmit}>Submit</div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default NewReviewPage;
