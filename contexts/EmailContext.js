import { createContext } from "react";

export const EmailContext = createContext();

export default function EmailContextProvider({ children }) {
    async function Submit(runMutation, email) {
        await runMutation({ email });
        alert("Saved successfully");
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function ValidateAndSubmit(email, runMutation) {
        if (validateEmail(email)) {
            Submit(runMutation, email);
        } else {
            alert("Please type a valid email!");
        }
    }

    return (
        <EmailContext.Provider value={{ ValidateAndSubmit }}>
            {children}
        </EmailContext.Provider>
    );
}
