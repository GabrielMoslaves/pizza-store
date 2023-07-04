import { createContext, useState } from "react";

export const SelectorContext = createContext();

export const SelectorContextProvider = ({ children }) => {
  const [select, setSelect] = useState([]);

  return (
    <SelectorContext.Provider value={{ select, setSelect }}>
      {children}
    </SelectorContext.Provider>
  );
};
