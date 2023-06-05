import Category from "@/enums/categoryEnum";

// interface Product {
//     name?: string,
//     category?: Category,
//     rating?: number,
// }

export interface Product {
    productId?: string
    name?: string
    category?: Category
    releaseYear?: string
    description?: string
    date_created?: any
    date_updated?: any
    coverImage?: string
    images?: string[]
    reviews?: any
}

export default Product