import { fetchReports, fetchRewards } from "@/services/admin/services";
import { useGlobalStore } from "@/states/globalStates";
import { PencilIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import { Button, Pagination } from "@mantine/core";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from "react";
import ReportTable from "./ReportTable";

const AdminReport = () => {

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const loadingHandler = useGlobalStore((state) => state.loadingHandler)

    return (
        <div className="min-h-[calc(100vh_-_5rem)] bg-white w-[85vw] p-10 px-20 flex flex-col">
            <div className="text-main text-2xl font-semi-bold mb-3">Reports Management</div>
            <ReportTable></ReportTable>
        </div >
    )
}

export default AdminReport