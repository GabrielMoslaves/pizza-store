import { useContext } from "react";
import { SelectorContext } from "../context/selector";

export const useSelector = () => {
  const context = useContext(SelectorContext);

  return context;
};
