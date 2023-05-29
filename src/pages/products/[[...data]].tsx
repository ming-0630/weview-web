import DefaultPageLayout from "@/components/layout/DefaultPagesLayout";
import ProductListPage from "@/components/templates/product/ProductListPage";
import Category from "@/enums/categoryEnum";
import { useRouter } from "next/router";


export default function ProductList() {
    const router = useRouter();

    if (router.query.data && router.query.data?.length == 2) {
        const category = router.query.data[0];
        const keyword = router.query.data[1];

        return (
            <DefaultPageLayout>
                <ProductListPage category={category} searchString={keyword}></ProductListPage>
            </DefaultPageLayout>
        )
    }

    if (router.query.data && router.query.data?.length == 1) {
        const category = router.query.data[0];

        return (
            <DefaultPageLayout>
                <ProductListPage category={category}></ProductListPage>
            </DefaultPageLayout>
        )
    }

    // HANDLE OTHER SITUATIONS...? LIKE IF GOT MORE PARAMS, or IF GOT LESS PARAMS

    // if (router.query.data && router.query.data?.length == 1) {
    //     const category = router.query.data[0];

    //     return (
    //         <DefaultPageLayout>
    //             <ProductListPage category={router.query.category}></ProductListPage>
    //         </DefaultPageLayout>
    //     )
    // }

}
