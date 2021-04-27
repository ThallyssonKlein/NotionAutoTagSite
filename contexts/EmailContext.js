import { useState, createContext, useEffect } from 'react';

export const EmailContext = createContext();

export default function UserContextProvider({children}){
    const [email, setEmail] = useState("");

    useEffect(_ => {
        console.log(email);
    });

    async function Submit(runMutation, email) {
        await runMutation({ email });
        setEmail("");
        alert('Saved successfully');
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function ValidateAndSubmit(runMutation) {
        console.log(email);
        if (validateEmail(email)) {
            Submit(runMutation, email);
        } else {
            alert("Please type a valid email!");
        }
    }

    return <EmailContext.Provider value={{ setEmail, ValidateAndSubmit }}>
        {children}
    </EmailContext.Provider>
}
