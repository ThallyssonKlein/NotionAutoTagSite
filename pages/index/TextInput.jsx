/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/react-in-jsx-scope */
// react
import { useState, useContext } from 'react';

// config
import firestore from '../../utils/firestore';

// components
import Input from '../../components/Input';
import InputError from '../../components/InputError';
import SuccessMessage from '../../components/SuccessMessage';
import ConfirmButton from '../../components/Buttons/ConfirmButton';

// context
import { IndexPageContext } from '../../contexts/IndexPageContext';

export default function TextInput() {
  const [email, setEmail] = useState('');
  const [emptyInputError, setEmptyInputError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const { setModalIsOpen } = useContext(IndexPageContext);

  async function submit() {
    setModalIsOpen(true);
    const { created } = await firestore.createDocument('leads', null, {
      email,
    });

    setEmail('');

    if (!created) {
      setEmptyInputError(true);
      return;
    }

    setSuccessMessage(true);
    setModalIsOpen(false);
  }

  function validateEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValidity = re.test(String(email).toLowerCase());

    if (!emailValidity) {
      setSuccessMessage(false);
      return setEmptyInputError(true);
    }

    return submit();
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
        <div>
          {successMessage && <SuccessMessage text="Thank you for your interest!" />}
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

                .empty-input-error {
                    margin-top: 10px;
                }
            `}

      </style>
    </>
  );
}
