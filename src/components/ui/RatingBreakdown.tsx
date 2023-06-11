import Product from "@/interfaces/productInterface"
import Review from "@/interfaces/reviewInterface"

export interface ratingBreakdownProps {
    product?: Product
}

const ratingBreakdown = (props: ratingBreakdownProps) => {

    const calculateRatingBreakdown = (reviews: Review[], stars: number) => {
        return (
            reviews.filter(x => x.rating == stars).length / reviews.length * 100
        )
    }

    const ratingBreakdown = {
        '5Star': props.product && props.product.reviews ? calculateRatingBreakdown(props.product.reviews, 5) : 0,
        '4Star': props.product && props.product.reviews ? calculateRatingBreakdown(props.product.reviews, 4) : 0,
        '3Star': props.product && props.product.reviews ? calculateRatingBreakdown(props.product.reviews, 3) : 0,
        '2Star': props.product && props.product.reviews ? calculateRatingBreakdown(props.product.reviews, 2) : 0,
        '1Star': props.product && props.product.reviews ? calculateRatingBreakdown(props.product.reviews, 1) : 0
    }
    return (
        <div className="flex flex-col gap-2 basis-2/5" data-theme="corporate">

            <div className="stats stats-vertical bg-white text-main border border-main rounded-lg">                                        <div className="stat">
                <div className='font-semibold text-gray-600 text-lg'>Star Distribution</div>
            </div>
                <div className="stat">
                    <div>
                        <div className="text-main">5 Stars</div>
                        <div className="flex items-center gap-3">
                            <progress className="progress progress-warning w-56"
                                value={ratingBreakdown["5Star"]} max={100}></progress>
                            <div className="text-main text-sm">
                                {Math.round(ratingBreakdown["5Star"])} %
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-main">4 Stars</div>
                        <div className="flex items-center gap-3">
                            <progress className="progress progress-warning w-56"
                                value={ratingBreakdown["4Star"]} max={100}></progress>
                            <div className="text-main text-sm">
                                {Math.round(ratingBreakdown["4Star"])} %
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-main">3 Stars</div>
                        <div className="flex items-center gap-3">
                            <progress className="progress progress-warning w-56"
                                value={ratingBreakdown["3Star"]} max={100}></progress>
                            <div className="text-main text-sm">
                                {Math.round(ratingBreakdown["3Star"])} %
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-main">2 Stars</div>
                        <div className="flex items-center gap-3">
                            <progress className="progress progress-warning w-56"
                                value={ratingBreakdown["2Star"]} max={100}></progress>
                            <div className="text-main text-sm">
                                {Math.round(ratingBreakdown["2Star"])} %
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-main">1 Stars</div>
                        <div className="flex items-center gap-3">
                            <progress className="progress progress-warning w-56"
                                value={ratingBreakdown["1Star"]} max={100}></progress>
                            <div className="text-main text-sm">
                                {Math.round(ratingBreakdown["1Star"])} %
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div >
    )
}

export default ratingBreakdown;