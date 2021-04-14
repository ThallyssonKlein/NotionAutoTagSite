import { useContext } from 'react';
import { EmailContext } from "./EmailContext";

export default function SubmitButton({runMutation}) {
  const { email, ValidateAndSubmit } = useContext(EmailContext);

  return (
    <input
      type="button"
      value="Submit"
      onClick={(e) => {
        ValidateAndSubmit(
          runMutation,
          email
        );
      }}
    />
  );
}
