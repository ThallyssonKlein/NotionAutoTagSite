import { useState } from "react";
import { useRouter } from "next/router";
import firestore from "../../utils/firestore";
import Input from "../shared/Input";
import InputError from "../shared/InputError";
import ConfirmButton from "../shared/Buttons/ConfirmButton";

export default function SigninInput() {
    const [token, setToken] = useState("");
    const [emptyInputError, setEmptyInputError] = useState(false);
    const router = useRouter();

    async function checkIfTokenIsValid(token) {
        const collection = await firestore
            .connect()
            .collection("authorizations")
            .get();

        collection.forEach((doc) => {
            if (doc.get("token") === token) {
                document.cookie = `email=${doc.get("email")}`;

                setEmptyInputError(false);

                router.push("/app");

                return;
            }

            setEmptyInputError(true);
            return;
        });
    }

    function onKeyPress({ key }) {
        return key === "Enter" ? checkIfTokenIsValid(token) : null;
    }

    return (
        <>
            <div className="input-container">
                <Input
                    value={token}
                    setValue={setToken}
                    onKeyPress={onKeyPress}
                    placeholder="Place your token here"
                />
                <div className="empty-input-error">
                    {emptyInputError && (
                        <InputError text="Your token is invalid. Make sure you typed it correctly." />
                    )}
                </div>
            </div>
            <div>
                <ConfirmButton
                    text="Log in"
                    value={token}
                    setValue={checkIfTokenIsValid}
                />
            </div>
            <style jsx>{`
                .input-container {
                    width: min(
                        100%,
                        20rem
                    ); // make sure the container has the same width of the input container
                    display: flex;
                    justify-content: center;
                    text-align: center;
                }
            `}</style>
        </>
    );
}
