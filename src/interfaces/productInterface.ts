import Category from "@/enums/categoryEnum";
import Review from "./reviewInterface";

export interface Product {
    productId?: string
    name?: string
    category?: Category
    releaseYear?: string
    description?: string
    date_created?: any
    date_updated?: any
    coverImage?: string
    rating?: number
    ratingCount?: number
    averagePrice?: number,
    minPrice?: number,
    maxPrice?: number,
    images?: string[],
    reviews?: Review[],
    totalReviewPage?: number,
    watchlisted?: boolean,
    unverifiedReview?: Review,
    reviewStartDate?: Date,
    reviewEndDate?: Date,
    ratings?: number[],
    minProductPriceRange?: number,
    maxProductPriceRange?: number,
    isFeatured?: boolean
}

export default Product