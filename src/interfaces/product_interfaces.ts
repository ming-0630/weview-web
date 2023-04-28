import Category from "@/enums/category_enum";

interface Product {
    name: string,
    type: Category,
    rating: number,
}

export default Product