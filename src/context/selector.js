import { createContext, useState } from "react";

export const SelectorContext = createContext();

export const SelectorContextProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [paymentForm, setPaymentForm] = useState("");
  const [change, setChange] = useState(0);

  const parsedSelectedProducts = selectedProducts.map((item) => {
    return { ...item, totalItemPrice: item.qtd * item.price };
  });

  const totalPrice = parsedSelectedProducts.reduce(
    (accumulator, item) => accumulator + item.totalItemPrice,
    0
  );

  return (
    <SelectorContext.Provider
      value={{
        selectedProducts,
        setSelectedProducts,
        paymentForm,
        setPaymentForm,
        change,
        setChange,
        parsedSelectedProducts,
        totalPrice,
      }}
    >
      {children}
    </SelectorContext.Provider>
  );
};
