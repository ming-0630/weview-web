import DefaultPageLayout from "@/components/layout/DefaultPagesLayout";
import ReviewingPage from "@/components/templates/review/ReviewingPage";
import { useRouter } from "next/router";

export default function CreateReview() {
    const router = useRouter();
    return (
        <DefaultPageLayout>
            <ReviewingPage id={router.query.id ? router.query.id : ""} />
        </DefaultPageLayout>
    )

}