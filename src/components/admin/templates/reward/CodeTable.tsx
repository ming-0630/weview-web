import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@mantine/core";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";

export interface Code {
    id: string,
    code: string,
    dateRedeemed: string,
    userEmail: string
}

interface CodeTableProps {
    codes: Code[];
}

const CodeTable = (props: CodeTableProps) => {

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        userEmail: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        dateRedeemed: { value: null, matchMode: FilterMatchMode.IN },
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

    const header = renderHeader();

    return (
        <DataTable value={props.codes}
            className="w-full"
            header={header}
            paginator rows={5} loading={false}
            filters={filters} filterDisplay="row"
            globalFilterFields={['code', 'userEmail', 'dateRedeemed']}>

            <Column field="code" header="Code" filter
                filterHeaderClassName="[&>div>div>input]:text-xs [&>div>div>input]:p-2" sortable></Column>

            < Column field="userEmail" header="User Email"
                filterHeaderClassName="[&>div>div>input]:text-xs [&>div>div>input]:p-2"
                filter sortable ></Column>

            <Column field="dateRedeemed" header="Date Redeemed" sortable></Column>

        </DataTable >
    )
}

export default CodeTable