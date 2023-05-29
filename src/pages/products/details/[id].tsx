import DefaultPageLayout from "@/components/layout/DefaultPagesLayout";
import ProductDetailsPage from "@/components/templates/product/ProductDetailsPage";
import { useRouter } from "next/router";

export default function ProductDetails() {
    const router = useRouter();
    return (
        <DefaultPageLayout>
            <ProductDetailsPage id={router.query.id ? router.query.id : ""}></ProductDetailsPage>
        </DefaultPageLayout>
    )

}