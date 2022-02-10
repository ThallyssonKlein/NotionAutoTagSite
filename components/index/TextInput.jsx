/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import firestore from '../../utils/firestore';
import Input from '../shared/Input';
import InputError from '../shared/InputError';
import ConfirmButton from '../shared/Buttons/ConfirmButton';

export default function TextInput() {
  const [email, setEmail] = useState('');
  const [emptyInputError, setEmptyInputError] = useState(false);

  async function submit() {
    const { created } = await firestore.createDocument('users', null, {
      email,
    });

    if (!created) {
      setEmptyInputError(true);
    }

    await firestore.createDocument('authorizations', null, {
      email,
      token: '',
    });
  }

  function validateEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValidity = re.test(String(email).toLowerCase());

    return emailValidity ? submit() : setEmptyInputError(true);
  }

  function onKeyPress({ key }) {
    return key === 'Enter' ? validateEmail() : null;
  }

  return (
    <>
      <div className="input-container">
        <Input
          type="email"
          value={email}
          setValue={setEmail}
          onKeyPress={onKeyPress}
          placeholder="Type your e-mail to receive early access to the product"
        />
        <div className="empty-input-error">
          {emptyInputError && (
            <InputError text="Please, type a valid e-mail." />
          )}
        </div>
      </div>
      <dv>
        <ConfirmButton
          text="Submit"
          value={email}
          setValue={validateEmail}
        />
      </dv>
      <style jsx>
        {`
                .input-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: min(
                        100%,
                        34rem
                    ); // 34rem is the width of the input placeholder
                }
            `}

      </style>
    </>
  );
}
