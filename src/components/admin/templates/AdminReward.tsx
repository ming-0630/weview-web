import { fetchRewards } from "@/services/admin/services";
import { useGlobalStore } from "@/states/globalStates";
import { Button, Pagination } from "@mantine/core";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from "react";

const AdminReward = () => {

    const [page, setPage] = useState(1);
    const [rewards, setRewards] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const toggleModal = useGlobalStore((state) => state.toggleNewRewardIsOpen)

    const loadingHandler = useGlobalStore((state) => state.loadingHandler)

    const getRewards = async () => {
        try {
            loadingHandler.open();
            const response = await fetchRewards(page);

            if (response && response.data) {
                console.log(response.data)
                if (response.data) {
                    setPage(response.data.pageNum)
                    setTotalPage(response.data.totalPage)
                    setRewards(response.data.rewards)
                    getRewards()
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
            <Button className="bg-main mb-3 self-end" onClick={toggleModal}>Add Rewards</Button>
            <DataTable value={rewards && rewards} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" sortable ></Column>
                <Column field="points" header="Points" sortable ></Column>
                <Column field="codeCount" header="Codes Left" sortable></Column>
            </DataTable>
            <div className="self-center mt-10">
                <Pagination value={page} onChange={handlePageChange} total={totalPage}
                    radius={'xl'}
                    boundaries={5}
                    classNames={{ control: 'border-transparent' }}
                />
            </div>
        </div>
    )
}

export default AdminReward