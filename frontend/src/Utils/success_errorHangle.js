import { toast } from "react-toastify";
export const successHandle = (message) => {
    toast.success(message)
};

export const errorHandle = (message) => {
    toast.error(message)
};