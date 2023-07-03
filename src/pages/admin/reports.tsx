import AdminLayout from "@/components/admin/layout/AdminLayout";
import AdminReport from "@/components/admin/templates/report/AdminReport";
import { useAuthStore } from "@/states/authStates";
import { useRouter } from "next/router";

export default function AdminRewards() {
    const { loggedInUser, isLoggedIn } = useAuthStore()
    const router = useRouter();

    if ((!isLoggedIn() || !loggedInUser?.role.includes("ROLE_ADMIN")) && typeof window !== "undefined") {
        alert("You must be an admin to access this page!")
        router.push("/admin")
    }

    return (
        <AdminLayout>
            <AdminReport></AdminReport>
        </AdminLayout>
    )

}