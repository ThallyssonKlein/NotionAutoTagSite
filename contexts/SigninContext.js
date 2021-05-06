import { createContext, useState } from "react";
import { useRouter } from "next/router";
import firestore from "../utils/firestore";

export const SigninContext = createContext();

export default function SigninContextProvider({ children }) {
    const [tokenValidity, setTokenValidity] = useState(true);

    const router = useRouter();

    async function checkIfTokenExists(token) {
        const collection = await firestore.connect
            .collection("authorizations")
            .get();

        collection.forEach((doc) => {
            if (doc.get("token") === token) {
                localStorage.setItem("email", doc.get("email"));

                setTokenValidity(true);

                router.push("/app");

                return;
            } else {
                setTokenValidity(false);
                return;
            }
        });
    }

    return (
        <SigninContext.Provider value={{ checkIfTokenExists, tokenValidity }}>
            {children}
        </SigninContext.Provider>
    );
}
