import { createContext, useState } from "react";

export const SelectorContext = createContext();

export const SelectorContextProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <SelectorContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </SelectorContext.Provider>
  );
};
