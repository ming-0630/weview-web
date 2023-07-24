import DefaultPageLayout from "@/components/layout/DefaultPagesLayout";
import ReviewingPage from "@/components/templates/review/ReviewingPage";
import Review from "@/interfaces/reviewInterface";
import { fetchOneReview } from "@/services/review/services";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

export default function EditReview({ review }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <DefaultPageLayout>
            <ReviewingPage review={review ? review : undefined} />
        </DefaultPageLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, resolvedUrl }) => {
    const idRegex = new RegExp(`/products/reviews/edit/(.*)`);
    const match = idRegex.exec(resolvedUrl);

    let id: string | undefined;

    if (match) {
        id = match[1];
    }

    if (id) {
        const response = await fetchOneReview(id)
        if (response && response.data) {
            return { props: { review: response.data } }
        } return { props: { review: undefined } }
    } return { props: { review: undefined } }
}
