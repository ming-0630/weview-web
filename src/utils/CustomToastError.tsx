import { toast } from "react-toastify";

const CustomToastError = (message: string) => {
    toast.error(message, {
        autoClose: 5000
    })
}

export default CustomToastError;