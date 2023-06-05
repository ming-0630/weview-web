import DefaultPageLayout from "@/components/layout/DefaultPagesLayout";
import NewProductReviewPage from "@/components/templates/product/NewProductReviewPage";
import ProductDetailsPage from "@/components/templates/product/ProductDetailsPage";
import { useRouter } from "next/router";

export default function CreateReview() {
    const router = useRouter();
    return (
        <DefaultPageLayout>
            <NewProductReviewPage id={router.query.id ? router.query.id : ""} />
        </DefaultPageLayout>
    )

}