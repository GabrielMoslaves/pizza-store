import { createContext, useState } from "react";


export const OpenModalContext = createContext()

export const OpenModalContextProvider = ({ children }) => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <OpenModalContext.Provider value={{ openModal, setOpenModal }}>
            {children}
        </OpenModalContext.Provider>
    );
};