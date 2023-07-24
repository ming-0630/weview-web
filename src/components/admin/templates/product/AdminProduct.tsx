import { fetchAllProducts } from "@/services/admin/services";
import { useGlobalStore } from "@/states/globalStates";
import { MagnifyingGlassIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@mantine/core";
import { FilterMatchMode } from "primereact/api";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from "react";

const AdminProduct = () => {

    const [products, setProducts] = useState([]);
    const toggleNewProductModal = useGlobalStore((state) => state.toggleNewProductIsOpen)
    const toggleEditProductModal = useGlobalStore((state) => state.toggleEditProductIsOpen)

    const loadingHandler = useGlobalStore((state) => state.loadingHandler)

    const getProducts = async () => {
        try {
            loadingHandler.open();
            const response = await fetchAllProducts();

            if (response && response.data) {
                if (response.data) {
                    setProducts(response.data)
                }
            }
        } finally {
            loadingHandler.close();
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        category: { value: null, matchMode: FilterMatchMode.CONTAINS },
        releaseYear: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e: any) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-end">
                <Input value={globalFilterValue} onChange={onGlobalFilterChange}
                    placeholder="Keyword Search" icon={<MagnifyingGlassIcon width={20}></MagnifyingGlassIcon>}
                    className="rounded-lg"
                />
            </div>
        );
    };

    const editProductTemplate = (rowData: any) => {
        return (
            <div className='flex justify-center'>
                <PencilIcon className="w-5 text-gray-500 hover:text-yellow-500 cursor-pointer" onClick={() =>
                    toggleEditProductModal(rowData.productId, getProducts)}></PencilIcon>
            </div>

        );
    };

    return (
        <div className="h-[calc(100vh_-_5rem)] bg-white w-[85vw] p-10 px-20 flex flex-col">
            <div className="text-main text-2xl font-semi-bold mb-3">Products Management</div>
            <Button className="bg-main mb-3 self-end" onClick={() =>
                toggleNewProductModal(getProducts)}>Add Product</Button>
            <DataTable value={products && products}
                className="w-full"
                header={renderHeader}
                paginator rows={5} loading={false}
                filters={filters} filterDisplay="row"
                globalFilterFields={['name', 'category', 'releaseYear']}>
                <Column field="name" header="Name" sortable style={{ width: '20%' }}
                    filter
                    showFilterMenu={false}
                    filterHeaderClassName="[&>div>div>input]:text-xs [&>div>div>input]:p-2" ></Column>
                <Column field="category" header="Category" style={{ width: '20%' }}
                    filter
                    showFilterMenu={false}
                    filterHeaderClassName="[&>div>div>input]:text-xs [&>div>div>input]:p-2" sortable></Column>
                <Column field="description" header="Description"></Column>
                <Column field="releaseYear" header="Year Released" filter sortable style={{ width: '15%' }}
                    showFilterMenu={false}
                    filterHeaderClassName="[&>div>div>input]:text-xs [&>div>div>input]:p-2"
                ></Column>
                <Column body={editProductTemplate} />
            </DataTable >
        </div>
    )
}

export default AdminProduct