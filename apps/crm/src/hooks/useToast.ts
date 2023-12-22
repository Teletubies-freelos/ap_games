import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export interface ToastProps {
    message: string;
    isError: boolean;
}
export default function useToast({
    message,
    isError = false
}: ToastProps) {
    if (isError) {
        toast.error(message, {
            position: "top-right",
            autoClose: 4000,
            closeOnClick: true,
            hideProgressBar: true,
            theme: "dark",

        });
    } else {
        toast.success(message);
    }
}