/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import Modal from 'react-modal';
import { TailSpin } from 'react-loader-spinner';
import ConnectWithNotion from './main/ConnectWithNotion';
// import Header from './header';
import GlobalStyles from '../../components/GlobalStyles';
import firestore from '../../utils/firestore';
import ConnectedWithNotion from './main/ConnectedWithNotion';

export default function App() {
  const cookies = new Cookies();
  const router = useRouter();
  const [connected, setConnected] = useState(false);
  const [checked, setChecked] = useState(false);
  const [center, setCenter] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  useEffect(() => {
    if (checked) {
      setModalIsOpen(false);
      if (connected) {
        setCenter(<ConnectedWithNotion />);
      } else {
        setCenter(<ConnectWithNotion />);
      }
    } else {
      setCenter(
        <Modal
          isOpen={modalIsOpen}
          contentLabel="Example Modal"
          className="modal"
          centered
        >
          <div className="modalcontainer">
            <TailSpin color="#00BFFF" height={80} width={80} />
          </div>
        </Modal>,
      );
    }
  }, [checked, connected]);

  async function useAccessToken(access_token) {
    const email = cookies.get('email');

    if (!email) {
      setConnected(false);
      setChecked(true);
      return;
    }

    const documents = await firestore
      .connect()
      .collection('authorizations')
      .get();

    documents.forEach(async (doc) => {
      if (doc.get('email') === email) {
        const documentId = doc.id;
        await firestore.updateDocumentField(
          `authorizations/${documentId}`,
          'access_token',
          access_token,
        );
        setConnected(true);
        setChecked(true);
        cookies.set('access_token', access_token);
      }
    });
  }

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    (async () => {
      const { code: authorizationCode } = router.query;

      const access_token_cookie = cookies.get('access_token');

      if (!authorizationCode && !access_token_cookie) {
        setConnected(false);
        setChecked(true);
        return;
      }

      if (access_token_cookie) {
        useAccessToken(access_token_cookie);
        return;
      }

      if (router.query && !access_token_cookie) {
        const body = {
          grant_type: 'authorization_code',
          code: authorizationCode,
          redirect_uri: (process.env.NODE_ENV === 'development') ? process.env.NEXT_PUBLIC_REDIRECT_URI_DEV : process.env.NEXT_PUBLIC_REDIRECT_URI,
        };

        let auth;

        if (process.env.NODE_ENV === 'development') {
          auth = btoa(
            `${process.env.NEXT_PUBLIC_CLIENT_ID_DEV}:${process.env.NEXT_PUBLIC_CLIENT_SECRET_DEV}`,
          );
        } else {
          auth = btoa(
            `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`,
          );
        }

        const { access_token } = await (
          await fetch('/api/notion', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ body: { ...body }, auth }),
          })
        ).json();

        if (!access_token) {
          setConnected(false);
          setChecked(true);
          return;
        }

        useAccessToken(access_token);
      }

      setConnected(false);
      setChecked(true);
    })();
  }, [router.isReady]);

  return (
    <GlobalStyles>
      <div className="container">
        {/* <Header /> */}
        <main>
          {center}
        </main>
      </div>
      <style jsx>
        {`
                .container { 
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100%;
                }
                main {
                    padding: 1rem;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    flex: 1;
                }
            `}

      </style>
    </GlobalStyles>
  );
}

export async function getServerSideProps(context) {
  const { email } = context.req.cookies;

  if (!email) {
    const { res } = context;
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
  }

  return { props: {} };
}
