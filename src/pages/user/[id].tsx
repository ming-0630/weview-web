import DefaultPageLayout from "@/components/layout/DefaultPagesLayout";
import Profile from "@/components/templates/user/Profile";
import { useRouter } from "next/router";

export default function UserDetails() {
    const router = useRouter();
    return (
        <DefaultPageLayout>
            <Profile id={router.query.id ? router.query.id : ""}></Profile>
        </DefaultPageLayout>
    )

}