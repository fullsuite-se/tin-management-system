import { useContext } from "react";
import { AlertContext } from "../context/alert-context";

const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
};

export default useAlert;