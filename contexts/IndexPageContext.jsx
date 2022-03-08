/* eslint-disable react/react-in-jsx-scope */
// react
import { createContext, useState } from 'react';

// definitions
export const IndexPageContext = createContext(null);

// component
// eslint-disable-next-line react/prop-types
export default function IndexPageContextProvider({ children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <IndexPageContext.Provider
      value={{
        modalIsOpen,
        setModalIsOpen,
      }}
    >
      {children}
    </IndexPageContext.Provider>
  );
}
