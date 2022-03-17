/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import ConnectWithNotion from './main/ConnectWithNotion';
// import Header from './header';
import GlobalStyles from '../../components/GlobalStyles';
import firestore from '../../utils/firestore';
import ConnectedWithNotion from './main/ConnectedWithNotion';

export default function App({ connected }) {
  return (
    <GlobalStyles>
      <div className="container">
        {/* <Header /> */}
        <main>
          {connected ? (
            <ConnectedWithNotion />
          ) : (
            <ConnectWithNotion />
          )}
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

function extractAccessTokenFromCookies(context) {
  return context.req.cookies.access_token;
}

export async function getServerSideProps(context) {
  if (extractAccessTokenFromCookies()) {
    return { props: { connected: true } };
  }

  const { code: authorizationCode, error } = context.query;

  if (error === 'access_denied') {
    return { props: { error } };
  }

  if (authorizationCode) {
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

    const { email } = context.req.cookies;
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
        context.res.setHeader('set-cookie', `access_token=${access_token}`);
      }
    });

    return { props: { connected: true } };
  }

  return { props: { connected: false } };
}
