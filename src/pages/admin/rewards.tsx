import AdminLayout from "@/components/admin/layout/AdminLayout";
import AdminReward from "@/components/admin/templates/reward/AdminReward";
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
            <AdminReward></AdminReward>
        </AdminLayout>
    )

}