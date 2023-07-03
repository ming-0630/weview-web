import Product from "@/interfaces/productInterface"
import Review from "@/interfaces/reviewInterface"

export interface ratingBreakdownProps {
    ratingList?: number[]
}

const ratingBreakdown = (props: ratingBreakdownProps) => {

    const calculateRatingBreakdown = (stars: number, ratings?: number[]) => {
        if (ratings) {
            return (
                ratings.filter((x) => x === stars).length / ratings.length * 100
            );
        } else {
            return 0
        }
    };

    const ratingBreakdown = {
        '5Star': calculateRatingBreakdown(5, props.ratingList),
        '4Star': calculateRatingBreakdown(4, props.ratingList),
        '3Star': calculateRatingBreakdown(3, props.ratingList),
        '2Star': calculateRatingBreakdown(2, props.ratingList),
        '1Star': calculateRatingBreakdown(1, props.ratingList),
    }

    return (
        <div className="flex flex-col gap-2 basis-2/5" data-theme="corporate">

            <div className="stats stats-vertical bg-white text-main border border-main rounded-lg">
                <div className="stat">
                    <div className='font-semibold text-gray-600 text-lg'>Star Distribution</div>
                </div>
                <div className="stat">
                    <div>
                        <div className="text-main">5 Stars</div>
                        <div className="flex items-center gap-3">
                            <progress className="progress progress-warning"
                                value={ratingBreakdown["5Star"]} max={100}></progress>
                            <div className="text-main text-sm w-10">
                                {Math.round(ratingBreakdown["5Star"])} %
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-main">4 Stars</div>
                        <div className="flex items-center gap-3">
                            <progress className="progress progress-warning"
                                value={ratingBreakdown["4Star"]} max={100}></progress>
                            <div className="text-main text-sm w-10">
                                {Math.round(ratingBreakdown["4Star"])} %
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-main">3 Stars</div>
                        <div className="flex items-center gap-3">
                            <progress className="progress progress-warning"
                                value={ratingBreakdown["3Star"]} max={100}></progress>
                            <div className="text-main text-sm w-10">
                                {Math.round(ratingBreakdown["3Star"])} %
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-main">2 Stars</div>
                        <div className="flex items-center gap-3">
                            <progress className="progress progress-warning"
                                value={ratingBreakdown["2Star"]} max={100}></progress>
                            <div className="text-main text-sm w-10">
                                {Math.round(ratingBreakdown["2Star"])} %
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-main">1 Stars</div>
                        <div className="flex items-center gap-3">
                            <progress className="progress progress-warning"
                                value={ratingBreakdown["1Star"]} max={100}></progress>
                            <div className="text-main text-sm w-10">
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