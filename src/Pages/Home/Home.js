import React from "react";
import Header from "../../Sections/Header/Header";
import Products from "../../Sections/Products/Products";
import About from "../../Sections/About/About";
import styles from "./styles.module.scss";
import ShoppingCart from "../../components/ShoppingCart";
import CartModal from "../../Sections/CartModal";
import { useOpener } from "../../hooks/useOpener";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const { openModal } = useOpener();

  return (
    <>
      <Toaster />
      <div className={styles.shoppingCart}>
        <ShoppingCart />
      </div>
      <Header />
      <Products />
      <About />
      {openModal && <CartModal />}
    </>
  );
};

export default Home;
