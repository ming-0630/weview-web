import Modal from "@/components/ui/Modal";
import { useGlobalStore } from "@/states/globalStates";
import CustomToastError from "@/utils/CustomToastError";
import { Button, Checkbox, Group, Textarea } from "@mantine/core";
import Image from 'next/image';
import { useState } from "react";
import { toast } from "react-toastify";
import WeViewLogo from '/public/favicon.ico';
import Report from "@/interfaces/reportInterface";
import { addReport } from "@/services/review/services";

const ReportModal = () => {
    const isShow = useGlobalStore((state) => state.reportIsOpen)
    const toggleModal = useGlobalStore((state) => state.toggleReport)
    const { reportingReviewId } = useGlobalStore()

    const [description, setDescription] = useState("")
    const [reason, setReason] = useState<string[]>([]);

    const handleSubmit = async () => {
        if (!reportingReviewId) {
            CustomToastError("No review found!")
            return;
        }

        if (reason.length <= 0) {
            CustomToastError("Please select at least 1 reason")
            return;
        }

        const report = new FormData();
        if (reason) {
            reason.forEach(r => {
                report.append("reportReasons[]", r)
            });
        }
        report.append("reviewId", reportingReviewId)
        report.append("description", description)


        const response = await addReport(report);
        if (response && response.status === 200) {
            toast("Reported successfully");
            toggleModal();
        }
    }

    const resetFields = () => {
        setDescription("");
        setReason([]);
    }

    return (
        <Modal isShow={isShow}
            toggleModal={() => { resetFields(); toggleModal() }}>
            <div className="p-5 w-[60vw] lg:w-[40vw]">
                <div className="flex items-center ml-4">
                    <div className='w-10 h-10 relative'>
                        <Image src={WeViewLogo} alt='WeView Logo' fill />
                    </div>
                    <div className="text-2xl text-main ml-4">{"Report"}</div>
                </div>
                <div className="p-3 flex flex-col">
                    <Checkbox.Group value={reason} onChange={(e) => { setReason(e) }}>
                        <Group mt="xs" className="flex flex-col justify-start items-start">
                            <Checkbox value="fake" label="Suspected Fake Review" />
                            <Checkbox value="image" label="Inappropiate Image" />
                            <Checkbox value="irrelevant" label="Irrelevant Information" />
                        </Group>
                    </Checkbox.Group>
                    <Textarea placeholder="Additional Description" value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                        className="mt-5"
                    ></Textarea>
                    <Button className="mt-3 bg-main self-end" variant='filled'
                        onClick={handleSubmit}
                    >Submit</Button>
                </div>

            </div>
        </Modal >
    )
}

export default ReportModal 
