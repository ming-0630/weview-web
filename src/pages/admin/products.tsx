import AdminLayout from "@/components/admin/layout/AdminLayout";
import { useAuthStore } from "@/states/authStates";
import { useRouter } from "next/router";

export default function AdminProduct() {
    const { loggedInUser, isLoggedIn } = useAuthStore()
    const router = useRouter();

    console.log(loggedInUser)

    if ((!isLoggedIn() || !loggedInUser?.role.includes("ROLE_ADMIN")) && typeof window !== "undefined") {
        alert("You must be an admin to access this page!")
        router.push("/admin/login")
    }

    return (
        <AdminLayout>
            <div className="h-[calc(100vh_-_5rem)] bg-white w-[85vw] p-10">x</div>
        </AdminLayout>
    )

}