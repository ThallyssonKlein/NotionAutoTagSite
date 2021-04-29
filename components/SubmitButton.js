import { useContext } from "react";
import { EmailContext } from "../contexts/EmailContext";

export default function SubmitButton({ runMutation, inputRef }) {
    const { ValidateAndSubmit } = useContext(EmailContext);

    return (
        <>
            <input
                type="button"
                value="Submit"
                onClick={() => {
                    ValidateAndSubmit(inputRef.current.value, runMutation);
                    inputRef.current.value = "";
                }}
            />
            <style jsx>
                {`
                    input[type="button"] {
                        border-radius: 1rem;
                        padding: 0.5rem 1rem;
                        background-color: hsl(193, 57%, 54%);
                        font-size: 2rem;
                        color: white;
                        margin-left: 1rem;
                        flex: 0.1;
                        cursor: pointer;
                        transition: background 0.2s ease;
                    }
                    input[type="button"]:hover {
                        background-color: hsl(193, 57%, 34%);
                    }
                `}
            </style>
        </>
    );
}
