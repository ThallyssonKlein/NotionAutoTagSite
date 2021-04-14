import { useState, createContext } from 'react';

export const EmailContext = createContext();

export default function UserContextProvider({children}){
    const [email, setEmail] = useState("");

    async function Submit(runMutation, email) {
        console.log(email);
        await runMutation({ email });
        setEmail("");
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function ValidateAndSubmit(runMutation, email) {
        console.log(email);
        if (validateEmail(email)) {
            Submit(runMutation, email);
        } else {
            alert("Please type a valid email!");
        }
    }

    return <EmailContext.Provider value={{ email, setEmail, ValidateAndSubmit }}>
        {children}
    </EmailContext.Provider>
}
