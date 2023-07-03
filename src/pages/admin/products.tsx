import AdminLayout from "@/components/admin/layout/AdminLayout";
import AdminProduct from "@/components/admin/templates/product/AdminProduct";
import { useAuthStore } from "@/states/authStates";
import { useRouter } from "next/router";

export default function AdminProducts() {
    const { loggedInUser, isLoggedIn } = useAuthStore()
    const router = useRouter();

    if ((!isLoggedIn() || !loggedInUser?.role.includes("ROLE_ADMIN")) && typeof window !== "undefined") {
        alert("You must be an admin to access this page!")
        router.push("/admin")
    }

    return (
        <AdminLayout>
            <AdminProduct></AdminProduct>
        </AdminLayout>
    )

}