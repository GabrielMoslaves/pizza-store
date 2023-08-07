import React from "react";
import { SelectorContextProvider } from "../context/selector";
import { OpenModalContextProvider } from "../context/openModal";

const Providers = ({ children }) => {
  return (
    <SelectorContextProvider>
      <OpenModalContextProvider>{children}</OpenModalContextProvider>
    </SelectorContextProvider>
  );
};

export default Providers;
