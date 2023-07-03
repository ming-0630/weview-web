import React, { useState, useEffect } from 'react';
import {
    DataTable, DataTablePageEvent, DataTableSortEvent, DataTableFilterEvent, DataTableFilterMeta, DataTableExpandedRows, DataTableValueArray
} from 'primereact/datatable';
import { Column } from 'primereact/column';
import Report from '@/interfaces/reportInterface';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useGlobalStore } from '@/states/globalStates';
import { fetchReports } from '@/services/admin/services';
import dayjs from 'dayjs';
import { Button } from '@mantine/core';
import Review from '@/interfaces/reviewInterface';
import { Tag } from 'primereact/tag';

const ReportTable = () => {
    const toggleInspectReview = useGlobalStore((state) => state.toggleInspectReview)
    const toggleInspectReport = useGlobalStore((state) => state.toggleInspectReport)

    const [reports, setReports] = useState([]);

    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined)
    const loadingHandler = useGlobalStore((state) => state.loadingHandler)

    const allowExpansion = (rowData: any) => {
        return rowData.reports.length > 0;
    };

    const getReports = async () => {
        const lastExpandedRows = expandedRows;
        try {
            loadingHandler.open();
            const response = await fetchReports();

            if (response && response.data) {
                if (response.data) {
                    setReports(response.data)
                    console.log(response.data)
                    if (lastExpandedRows) {
                        let _expandedRows: DataTableExpandedRows | DataTableValueArray | undefined = {}
                        _expandedRows = lastExpandedRows
                        setExpandedRows(_expandedRows)
                    }

                }
            }

        } finally {
            loadingHandler.close();
        }
    }

    useEffect(() => {
        getReports();
    }, [])

    const viewReview = (review: Review) => {
        toggleInspectReview(review)
    }

    const viewReviewTemplate = (rowData: any) => {
        return (
            <Button className='bg-main flex items-center' onClick={() => { viewReview(rowData.review) }}>
                <EyeIcon className='text-white w-5 mr-3'></EyeIcon> View Review
            </Button>
        );
    };

    const reportNumberTemplate = (rowData: any) => {
        return (
            <span>{rowData.reports.length}</span>
        );
    };

    const latestDateTemplate = (rowData: any) => {
        return (
            <span>{dayjs(rowData.latestReportDate).format("DD/MM/YYYY - hh:mm:ss A")}</span>
        );
    };

    const rowExpansionTemplate = (data: any) => {
        return (
            <div className="py-8 px-14 bg-gray-50 rounded-lg">
                <h2 className='font-semibold ml-1 mb-3 text-xl text-main'>List of reports</h2>
                <DataTable value={data.reports} paginator rows={10}>
                    <Column header="Reported by" sortable body={userTemplate}></Column>
                    <Column header="Reported Date" sortable body={reportedDateTemplate}></Column>
                    <Column header="Status" sortable body={reportStatusTemplate}></Column>
                    <Column body={showReportTemplate} />
                </DataTable>
            </div>
        );
    };

    const reportedDateTemplate = (rowData: any) => {
        return (
            <span>{dayjs(rowData.dateUpdated).format("DD/MM/YYYY - hh:mm:ss A")}</span>
        );
    };

    const userTemplate = (rowData: any) => {
        return (
            <span>{rowData.reporter.email}</span>
        );
    };

    const reportStatusTemplate = (rowData: Report) => {
        return <Tag value={rowData.action} severity={getSeverity(rowData.action!)}></Tag>;
    };

    const getSeverity = (action: string) => {
        switch (action) {
            case 'RESOLVED':
                return 'info';

            case 'REVIEWING':
                return 'warning';

            case 'DISMISSED':
                return 'danger';

            case 'DELETED':
                return 'success';

            default:
                return null;
        }
    };

    const showReportTemplate = (rowData: any) => {
        return (
            <div className='flex justify-center'>
                <Button className='bg-main flex items-center' onClick={() => { toggleInspectReport(rowData, getReports) }}>
                    <EyeIcon className='text-white w-5 mr-3'></EyeIcon> View Report
                </Button>
            </div>

        );
    };

    return (
        <div className="card">
            <DataTable value={reports}
                dataKey='id'
                className="w-full"
                expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
                paginator rows={10}>
                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field='id' body={viewReviewTemplate} />
                <Column field='reports' header="Number of Reports" sortable body={reportNumberTemplate} />
                <Column field="latestReportDate" sortable filter header="Date Reported"
                    filterPlaceholder="Search" body={latestDateTemplate}
                />
            </DataTable >
        </div>
    );
}

export default ReportTable