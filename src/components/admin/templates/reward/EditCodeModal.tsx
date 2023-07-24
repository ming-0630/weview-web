import Modal from "@/components/ui/Modal";
import { addCodes, getCodes } from "@/services/admin/services";
import { useGlobalStore } from "@/states/globalStates";
import CustomToastError from "@/utils/CustomToastError";
import { Button, Textarea } from "@mantine/core";
import dayjs from "dayjs";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CodeTable, { Code } from "./CodeTable";
import WeViewLogo from '/public/favicon.ico';
import { Chips, ChipsChangeEvent } from "primereact/chips";

const EditCodeModal = () => {
    const isShow = useGlobalStore((state) => state.editCodeIsOpen)
    const toggleModal = useGlobalStore((state) => state.toggleEditCodeIsOpen)
    const { editingReward, loadingHandler } = useGlobalStore();

    const [codes, setCodes] = useState<Code[]>([]);
    const [newCodes, setNewCodes] = useState<string[]>([]);

    const fetchCodes = async () => {
        if (editingReward) {
            const response = await getCodes(editingReward.id!)

            if (response && response.data) {
                response.data.forEach((code: Code) => {
                    if (code.dateRedeemed) {
                        code.dateRedeemed = dayjs(code.dateRedeemed).format("DD/MM/YYYY - hh:mm:ss A");
                    } else {
                        code.dateRedeemed = '-'
                        code.userEmail = '-'
                    }

                })
                setCodes(response.data)
            }
        }
    }

    const handleSubmit = async () => {
        loadingHandler.open();
        try {
            if (editingReward && editingReward.id) {
                if (!newCodes || newCodes.length <= 0) {
                    CustomToastError("Code field cannot be empty!")
                    return;
                }
                const response = await addCodes(editingReward.id, newCodes);

                if (response && response.status == 200) {
                    toast.success("Added code");
                    setNewCodes([]);
                    fetchCodes();
                }
            }

        } finally {
            loadingHandler.close()
        }
    }

    // const convertStringToArray = (string: string) => {
    //     const regex = /^[a-zA-Z0-9]+(?:,\s?[a-zA-Z0-9]+)*$/;

    //     if (!regex.test(string)) {
    //         // String does not fulfill the desired format
    //         return null;
    //     }
    //     const arr = string.replace(/\s/g, '').split(',');
    //     return arr;
    // }

    useEffect(() => {
        if (editingReward) {
            fetchCodes();
        }
    }, [editingReward])

    return (
        <Modal isShow={isShow}
            toggleModal={() => toggleModal(undefined)}>
            <div className="p-8 w-[60vw] flex flex-col  h-[90vh]">
                <div className="flex items-center ml-4">
                    <div className='w-10 h-10 relative'>
                        <Image src={WeViewLogo} alt='WeView Logo' fill />
                    </div>
                    <div className="text-2xl text-main ml-4">{"Manage Codes"}</div>
                </div>
                <div className="flex flex-col mt-5">
                    <div className="flex flex-col">
                        <div className="ml-1">Insert new codes</div>
                        <div className="card p-fluid mt-3">
                            <Chips value={newCodes} onChange={(e: ChipsChangeEvent) => setNewCodes(e.value!)} separator=","
                                placeholder="Insert codes here"
                                tooltip="Press 'Enter' to add code" />
                        </div>
                    </div>
                    <div className="flex gap-3 self-end">
                        <Button className="bg-main w-24 mt-3" onClick={handleSubmit}>Add</Button>
                    </div>
                    <div className="h-0.5 bg-gray-400 m-5"></div>
                    <div className="ml-1 mb-2">Code List</div>
                    <CodeTable codes={codes}></CodeTable>
                </div>
            </div>

        </Modal >
    )
}

export default EditCodeModal 
