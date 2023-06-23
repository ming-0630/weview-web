import AdminLayout from "@/components/admin/layout/AdminLayout";
import AdminReward from "@/components/admin/templates/AdminReward";
import { fetchRewards } from "@/services/admin/services";
import { useAuthStore } from "@/states/authStates";
import { useGlobalStore } from "@/states/globalStates";
import { Button, Pagination } from "@mantine/core";
import { useRouter } from "next/router";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from "react";

export default function AdminRewards() {
    const { loggedInUser, isLoggedIn } = useAuthStore()
    const router = useRouter();

    if ((!isLoggedIn() || !loggedInUser?.role.includes("ROLE_ADMIN")) && typeof window !== "undefined") {
        alert("You must be an admin to access this page!")
        router.push("/admin/login")
    }

    return (
        <AdminLayout>
            <AdminReward></AdminReward>
        </AdminLayout>
    )

}