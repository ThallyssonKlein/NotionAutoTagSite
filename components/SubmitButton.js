import { useContext } from 'react';
import { EmailContext } from "../contexts/EmailContext";

export default function SubmitButton({runMutation, inputRef}) {
  const { ValidateAndSubmit } = useContext(EmailContext);

  return (
    <input
      type="button"
      value="Submit"
      onClick={(e) => {
        inputRef.current.value = "";
        ValidateAndSubmit(
          runMutation
        );
      }}
    />
  );
}
