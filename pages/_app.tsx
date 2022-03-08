//context
import IndexPageContextProvider from "../contexts/IndexPageContext";

export default function MyApp({ Component, pageProps }) {
    return <IndexPageContextProvider>
        <Component {...pageProps} />
    </IndexPageContextProvider>
  }
  