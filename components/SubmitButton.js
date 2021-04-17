import { useContext } from 'react';
import { EmailContext } from "../contexts/EmailContext";

export default function SubmitButton({runMutation}) {
  const { email, ValidateAndSubmit } = useContext(EmailContext);

  return (
    <input
      type="button"
      value="Submit"
      style={{padding : 10, color : "white", backgroundColor : "#46afcd", borderRadius : 10}}
      onClick={(e) => {
        ValidateAndSubmit(
          runMutation,
          email
        );
      }}
    />
  );
}
