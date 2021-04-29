import { useContext } from "react";
import { EmailContext } from "../contexts/EmailContext";

export default function SubmitButton({ runMutation, inputRef }) {
    const { ValidateAndSubmit } = useContext(EmailContext);

    return (
        <input
            type="button"
            value="Submit"
            onClick={(e) => {
                ValidateAndSubmit(inputRef.current.value, runMutation);
                inputRef.current.value = "";
            }}
        />
    );
}
