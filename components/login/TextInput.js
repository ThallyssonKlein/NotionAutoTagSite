import { useState } from "react";
import { useRouter } from "next/router";
import firestore from "../../utils/firestore";
import SubmitButton from "./SubmitButton";

export default function SigninInput() {
    const [token, setToken] = useState("");
    const [tokenValidity, setTokenValidity] = useState(true);
    const router = useRouter();

    async function checkIfTokenIsValid(token) {
        const collection = await firestore
            .connect()
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

    function onKeyPress(key) {
        return key === "Enter" ? checkIfTokenIsValid(token) : null;
    }

    return (
        <>
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder="Place your token here"
                    value={token}
                    onChange={({ target }) => setToken(target.value)}
                    onKeyPress={({ key }) => onKeyPress(key)}
                />
                <span className="token-validity">Invalid token</span>
            </div>
            <div className="button-wrapper">
                <SubmitButton
                    text="Log in"
                    token={token}
                    checkIfTokenIsValid={checkIfTokenIsValid}
                />
            </div>
            <style jsx>
                {`
                    .input-wrapper input {
                        max-width: 35rem;
                        height: 3rem;
                        border-radius: 0.3rem;
                        padding: 0.4rem 1rem;
                        flex: 1;
                        background-color: var(--input-background);
                        color: var(--highlighted-font-color);
                        font-weight: 500;
                        box-shadow: var(--inside-box-shadow);
                    }
                    .input-wrapper input::placeholder {
                        color: var(--font-color);
                        font-weight: 400;
                    }
                    .input-wrapper input:focus {
                        box-shadow: var(--input-focus-highlight);
                    }
                    .token-validity {
                        margin-top: 0.5rem;
                        text-align: center;
                        font-size: 1.2rem;
                        font-weight: bold;
                        color: var(--error-color);
                    }
                `}
            </style>
            <style jsx>
                {`
                    .token-validity {
                        display: ${tokenValidity ? "none" : "block"};
                    }
                `}
            </style>
        </>
    );
}
