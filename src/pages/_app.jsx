/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */

// context
import IndexPageContextProvider from '../contexts/IndexPageContext';

// eslint-disable-next-line react/prop-types
export default function MyApp({ Component, pageProps }) {
  return (
    <IndexPageContextProvider>
      <Component {...pageProps} />
    </IndexPageContextProvider>
  );
}
