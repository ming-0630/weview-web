import { fetchRewards } from "@/services/admin/services";
import { useGlobalStore } from "@/states/globalStates";
import { PencilIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import { Button, Pagination } from "@mantine/core";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from "react";

const AdminReward = () => {

    const [page, setPage] = useState(1);
    const [rewards, setRewards] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const toggleNewRewardModal = useGlobalStore((state) => state.toggleNewRewardIsOpen)
    const toggleEditRewardModal = useGlobalStore((state) => state.toggleEditRewardIsOpen)
    const toggleCodeModal = useGlobalStore((state) => state.toggleEditCodeIsOpen)

    const loadingHandler = useGlobalStore((state) => state.loadingHandler)

    const getRewards = async () => {
        try {
            loadingHandler.open();
            const response = await fetchRewards(page);

            if (response && response.data) {
                if (response.data) {
                    setTotalPage(response.data.totalPage)
                    setRewards(response.data.rewards)
                }
            }

        } finally {
            loadingHandler.close();
        }
    }

    useEffect(() => {
        getRewards();
    }, [page])

    const handlePageChange = (value: number) => {
        setPage(value);
    }

    return (
        <div className="h-[calc(100vh_-_5rem)] bg-white w-[85vw] p-10 px-20 flex flex-col">
            <div className="text-main text-2xl font-semi-bold mb-3">Rewards Management</div>
            <Button className="bg-main mb-3 self-end" onClick={() =>
                toggleNewRewardModal(getRewards)}>Add Rewards</Button>
            <DataTable value={rewards && rewards} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" sortable ></Column>
                <Column field="points" header="Points" sortable ></Column>
                <Column field="codeCount" header="Codes Left" sortable></Column>
                <Column body={(rowData, options) => {
                    return (
                        <div className="flex gap-3">
                            <PencilIcon className="w-5 text-gray-500 hover:text-yellow-500 cursor-pointer" onClick={() =>
                                toggleEditRewardModal(rowData, getRewards)}></PencilIcon>
                            <RectangleStackIcon className="w-5 text-gray-500 hover:text-main cursor-pointer" onClick={() =>
                                toggleCodeModal(rowData, getRewards)}></RectangleStackIcon>
                        </div>
                    )
                }}></Column >
            </DataTable >
            <div className="self-center mt-10">
                <Pagination value={page} onChange={handlePageChange} total={totalPage}
                    radius={'xl'}
                    boundaries={5}
                    classNames={{ control: 'border-transparent' }}
                />
            </div>
        </div >
    )
}

export default AdminReward