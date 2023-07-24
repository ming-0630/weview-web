import Modal from "@/components/ui/Modal";
import { useGlobalStore } from "@/states/globalStates";
import { Avatar, Button, Checkbox, Group, Select, Textarea } from "@mantine/core";
import Image from 'next/image';
import { forwardRef, useEffect, useState } from "react";
import WeViewLogo from '/public/favicon.ico';
import { toast } from "react-toastify";
import { reportAction } from "@/services/admin/services";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

const InspectReportModal = () => {
    const isShow = useGlobalStore((state) => state.inspectReportIsOpen)
    const toggleModal = useGlobalStore((state) => state.toggleInspectReport)
    const { inspectingReport, loadingHandler, refreshFunction } = useGlobalStore();

    const [description, setDescription] = useState("")
    const [action, setAction] = useState<string | null>(null);
    const [reason, setReason] = useState<string[]>([]);

    useEffect(() => {
        console.log(inspectingReport)
        if (inspectingReport) {

            setAction(inspectingReport?.action ?? null);
            setReason(inspectingReport?.reportReasons ?? []);

            if (inspectingReport.description) {
                setDescription(inspectingReport.description)
            }
        }
    }, [inspectingReport])

    const selectOptions = [
        { value: 'REVIEWING', label: 'In Review', image: <ClockIcon className="w-4"></ClockIcon> },
        { value: 'ACCEPTED', label: 'Accept', image: <CheckIcon className="w-4"></CheckIcon> },
        { value: 'DISMISSED', label: 'Dismiss', image: <XMarkIcon className="w-4"></XMarkIcon> },
    ]

    interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
        image: string;
        label: string;
        description: string;
    }

    // eslint-disable-next-line react/display-name
    const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
        ({ image, label, description, ...others }: ItemProps, ref) => (
            <div ref={ref} {...others}>
                <Group noWrap className={classNames(label == 'In Review' ? 'text-yellow-500' : (label == 'Dismiss' ? 'text-red-500' : 'text-green-500'))}>
                    <div>{image}</div>
                    <div>
                        <div className="text-sm">{label}</div>
                    </div>
                </Group>
            </div>
        )
    );

    const resetFields = () => {
        setDescription('')
        setAction('')
    }

    const handleSubmit = async () => {
        loadingHandler.open();
        try {
            if (inspectingReport) {
                const report = new FormData();
                if (action == "DISMISSED") {
                    report.append("reportId", inspectingReport?.id!)
                    report.append("action", action)
                    const response = await reportAction(report);
                    if (response && response.status === 200) {
                        toast("Report Dismissed");
                        if (refreshFunction) {
                            refreshFunction();
                        }
                        toggleModal();
                        resetFields();
                    }
                    return;
                }

                if (action == "REVIEWING") {
                    toggleModal();
                    resetFields();
                    return;
                }

                if (action == "ACCEPTED") {
                    if (reason && reason == inspectingReport?.reportReasons) {
                        reason.forEach(r => {
                            report.append("reportReasons[]", r)
                        });
                    }
                    report.append("reportId", inspectingReport?.id!)
                    report.append("description", description)
                    report.append("action", action)

                    const response = await reportAction(report);
                    if (response && response.status === 200) {
                        toast("Report Dismissed");
                        if (refreshFunction) {
                            refreshFunction();
                        }
                        toggleModal();
                        resetFields();
                    }
                    return;
                }
            }
        } finally {
            loadingHandler.close()
        }
    }

    return (
        <Modal isShow={isShow}
            toggleModal={() => { resetFields(); toggleModal(undefined) }}>
            <div className="p-8 w-[35vw] flex flex-col">
                <div className="flex items-center ml-4">
                    <div className='w-10 h-10 relative'>
                        <Image src={WeViewLogo} alt='WeView Logo' fill />
                    </div>
                    <div className="text-2xl text-main ml-4">{"Inspect Report"}</div>
                </div>
                <div className="flex flex-col mt-5">
                    <Checkbox.Group value={reason} onChange={(e) => { setReason(e) }}>
                        {
                            inspectingReport?.action == "REVIEWING" ?
                                <Group mt="xs" className="flex flex-col justify-start items-start" >
                                    <Checkbox value="FAKE" label="Suspected Fake Review" />
                                    <Checkbox value="IMAGE" label="Inappropiate Image" />
                                    <Checkbox value="IRRELEVANT" label="Irrelevant Information" />
                                </Group>
                                :
                                <Group mt="xs" className="flex flex-col justify-start items-start">
                                    <Checkbox value="FAKE" label="Suspected Fake Review" disabled />
                                    <Checkbox value="IMAGE" label="Inappropiate Image" disabled />
                                    <Checkbox value="IRRELEVANT" label="Irrelevant Information" disabled />
                                </Group>
                        }
                    </Checkbox.Group>
                    <Textarea placeholder="Additional Description" defaultValue={inspectingReport?.description}
                        value={description}
                        classNames={{ input: 'h-[30vh]' }}
                        onChange={(e) => { setDescription(e.target.value) }}
                        className="mt-5"
                        disabled={inspectingReport?.action == "ACCEPTED"}
                    ></Textarea>
                    <div className="flex items-center justify-between mt-3">
                        <Select value={action} onChange={setAction} data={selectOptions} label={"Admin Action"} itemComponent={SelectItem}
                            classNames={{ label: 'text-main' }} placeholder="Please select an action" disabled={inspectingReport?.action != "REVIEWING"} />
                        <Button className="mt-3 bg-main self-end" variant='filled'
                            onClick={handleSubmit}
                            disabled={inspectingReport?.action != "REVIEWING"}
                            hidden={inspectingReport?.action == "ACCEPTED"}
                        >Submit</Button>
                    </div>

                </div>
            </div>

        </Modal >
    )
}

export default InspectReportModal 
