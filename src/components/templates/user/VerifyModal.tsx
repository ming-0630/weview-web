import Modal from "@/components/ui/Modal";
import { useGlobalStore } from "@/states/globalStates";
import { Button, Input } from "@mantine/core";
import Image from 'next/image';
import WeViewLogo from '/public/favicon.ico';
import { useEffect, useState } from "react";
import { getVerificationCode, verifyCode } from "@/services/user/services";
import { toast } from "react-toastify";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/types";
import CustomToastError from "@/utils/CustomToastError";

const VerifyModal = () => {
    const isShow = useGlobalStore((state) => state.verifyIsOpen)
    const toggleModal = useGlobalStore((state) => state.toggleVerify)
    const [hasSentCode, setHasSentCode] = useState(false)
    const [phone, setPhone] = useState<E164Number | undefined>()
    const [sentPhone, setSentPhone] = useState("")
    const [code, setCode] = useState("")

    const [isCooldown, setIsCooldown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(60);

    useEffect(() => {
        let timerId: any;

        if (isCooldown && cooldownTime > 0) {
            timerId = setTimeout(() => {
                setCooldownTime(prevTime => prevTime - 1);
            }, 1000);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [isCooldown, cooldownTime]);

    const handleSendCode = async () => {
        if (phone) {
            setHasSentCode(true)
            setIsCooldown(true);
            setTimeout(() => {
                setIsCooldown(false);
                setCooldownTime(60);
            }, 60000);

            const response = await getVerificationCode(phone?.toString());
            if (response) {
                toast(response.data)
            }
            setSentPhone(phone);
        } else {
            CustomToastError("Empty phone number!")
        }

    }

    const handleSubmitCode = async () => {
        if (code) {
            const response = await verifyCode(sentPhone, code);
            if (response) {
                toast(response.data)
            }
        } else {
            CustomToastError("Empty code field!")
        }
    }

    const resetFields = () => {
        setHasSentCode(false)
        setPhone(undefined)
        setCode("")
        setSentPhone("")
    }

    return (
        <Modal isShow={isShow}
            toggleModal={() => { resetFields(); toggleModal() }}>
            <div className="p-5 w-[60vw] lg:w-[40vw]">
                <div className="flex items-center ml-4">
                    <div className='w-10 h-10 relative'>
                        <Image src={WeViewLogo} alt='WeView Logo' fill />
                    </div>
                    <div className="text-2xl text-main ml-4">{"Verify Account"}</div>
                </div>
                <div className="p-3 flex flex-col">
                    <div className="mb-3">Verify your account to unlock important features!</div>
                    <div className="flex items-center">
                        {/* <Input placeholder="Phone number" className="grow" value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        ></Input> */}
                        <PhoneInputWithCountrySelect value={phone} onChange={setPhone}
                            defaultCountry="MY"
                            className="[&>input]:p-3 grow"
                        ></PhoneInputWithCountrySelect>
                        <Button variant='outline' className="hover:text-white hover:bg-main ml-3"
                            onClick={handleSendCode}
                            disabled={isCooldown}
                        >{isCooldown ? `Resend Code: ${cooldownTime}s` : (
                            hasSentCode ? 'Resend Code' : 'Send Code'
                        )}</Button>
                    </div>

                    <div className="flex flex-col mt-3 w-[25%] self-center">
                        <Input placeholder="Code" className="grow" value={code}
                            onChange={(e) => setCode(e.target.value)} ></Input>
                        <Button className="mt-3 bg-main" variant='filled'
                            onClick={handleSubmitCode}
                        >Submit</Button>
                    </div>
                </div>

            </div>
        </Modal >
    )
}

export default VerifyModal 
