import DefaultPageLayout from "@/components/layout/DefaultPagesLayout";
import CommentList from "@/components/templates/user/CommentList";

export default function CommentListPage() {
    return (
        <DefaultPageLayout>
            <CommentList></CommentList>
        </DefaultPageLayout>
    )
}