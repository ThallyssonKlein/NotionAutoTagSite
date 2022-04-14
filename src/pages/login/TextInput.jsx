/* eslint-disable guard-for-in */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import firestore from '../../utils/firestore';
import Input from '../../components/Input';
import InputError from '../../components/InputError';
import ConfirmButton from '../../components/Buttons/ConfirmButton';

// eslint-disable-next-line react/prop-types
export default function SigninInput({ setModalIsOpen }) {
  const cookies = new Cookies();
  const [token, setToken] = useState('');
  const [emptyInputError, setEmptyInputError] = useState(false);
  const router = useRouter();

  // eslint-disable-next-line no-shadow
  async function checkIfTokenIsValid(token) {
    setModalIsOpen(true);
    const collection = await firestore
      .connect()
      .collection('authorizations')
      .get();

    // eslint-disable-next-line no-restricted-syntax
    for (const i in collection.docs) {
      const doc = collection.docs[i];
      if (doc.get('token') === token) {
        cookies.set('email', doc.get('email'), {
          maxAge: 31536000,
        });

        setEmptyInputError(false);
        setModalIsOpen(false);

        router.push('/app');

        return;
      }
    }

    setModalIsOpen(false);
    setEmptyInputError(true);
  }

  function onKeyPress({ key }) {
    return key === 'Enter' ? checkIfTokenIsValid(token) : null;
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
      <style jsx>
        {`
                .input-container {
                    width: min(
                        100%,
                        20rem
                    ); // make sure the container has the same width of the input container
                    display: flex;
                    justify-content: center;
                    text-align: center;
                }
            `}

      </style>
    </>
  );
}
