import { useContext } from "react";
import { EmailContext } from "../../contexts/EmailContext";

export default function SubmitButton({ runMutation, inputRef }) {
    const { ValidateAndSubmit } = useContext(EmailContext);

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    ValidateAndSubmit(inputRef.current.value, runMutation);
                    inputRef.current.value = "";
                }}
            >
                Submit
            </button>
            <style jsx>
                {`
                    button {
                        height: 3rem;
                        border-radius: 0.3rem;
                        padding: 0rem 1rem;
                        background-color: var(--button-background-color);
                        box-shadow: var(--outside-box-shadow);
                        font-size: 1.8rem;
                        font-weight: 500;
                        color: white;
                        margin-left: 1rem;
                        flex: 0.1;
                        cursor: pointer;
                        transition: background 0.2s ease;
                    }
                    button:hover {
                        background-color: var(--hovered-buton-background-color);
                    }
                    @media only screen and (max-width: 335px) {
                        button {
                            margin-top: 1rem;
                        }
                    }
                `}
            </style>
        </>
    );
}
