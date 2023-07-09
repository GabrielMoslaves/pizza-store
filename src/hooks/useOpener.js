import { useContext } from "react";
import { OpenModalContext } from "../context/openModal";

export const useOpener = () => {
  const context = useContext(OpenModalContext);

  return context;
};
