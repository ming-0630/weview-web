import DefaultPageLayout from "@/components/layout/DefaultPagesLayout";
import NavBar from "@/components/layout/nav/NavBar";
import ProductListPage from "@/components/templates/product/ProductListPage";

export default function ProductList() {
    return (
        <DefaultPageLayout>
            <ProductListPage></ProductListPage>
        </DefaultPageLayout>
    )
}
