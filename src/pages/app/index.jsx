/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import ConnectWithNotion from './main/ConnectWithNotion';
// import Header from './header';
import GlobalStyles from '../../components/GlobalStyles';
import firestore from '../../utils/firestore';
import ConnectedWithNotion from './main/ConnectedWithNotion';
import { extractEmailFromCookies } from '../../utils/cookies';

export default function App() {
  const cookies = new Cookies();
  const router = useRouter();
  const [connected, setConnected] = useState(false);
  const [checked, setChecked] = useState(false);
  const [center, setCenter] = useState([]);

  useEffect(() => {
    if (checked) {
      if (connected) {
        setCenter(<ConnectedWithNotion />);
      } else {
        setCenter(<ConnectWithNotion />);
      }
    } else {
      setCenter(<h1>loading</h1>);
    }
  }, [checked, connected]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    (async () => {
      const { code: authorizationCode } = router.query;

      if (!authorizationCode) {
        setConnected(false);
        setChecked(true);
        return;
      }

      if (router.query) {
        const body = JSON.stringify({
          grant_type: 'authorization_code',
          code: authorizationCode,
          redirect_uri: (process.env.NODE_ENV === 'development') ? process.env.NEXT_PUBLIC_REDIRECT_URI_DEV : process.env.NEXT_PUBLIC_REDIRECT_URI,
        });

        let auth;

        if (process.env.NODE_ENV === 'development') {
          Buffer.from(
            `${process.env.NEXT_PUBLIC_CLIENT_ID_DEV}:${process.env.NEXT_PUBLIC_SECRET_DEV}`,
          ).toString('base64');
        } else {
          Buffer.from(
            `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_SECRET}`,
          ).toString('base64');
        }

        const { access_token } = await (
          await fetch('https://api.notion.com/v1/oauth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${auth}`,
            },
            body,
          })
        ).json();

        if (!access_token) {
          setConnected(false);
          setChecked(true);
          return;
        }

        const email = extractEmailFromCookies();
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
            cookies.set('access_token', access_token, { path: '/app' });
            setConnected(true);
            setChecked(true);
          }
        });
      }
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
