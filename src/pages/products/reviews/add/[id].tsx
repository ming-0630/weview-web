import DefaultPageLayout from "@/components/layout/DefaultPagesLayout";
import NewReviewPage from "@/components/templates/review/NewReviewPage";
import { useRouter } from "next/router";

export default function CreateReview() {
    const router = useRouter();
    return (
        <DefaultPageLayout>
            <NewReviewPage id={router.query.id ? router.query.id : ""} />
        </DefaultPageLayout>
    )

}