import React from "react";
import styles from "./styles.module.scss";
import ShoppingCart from "../../components/ShoppingCart";
import Header from "../Home/Sections/Header/Header";
import Products from "../Home/Sections/Products/Products";
import About from "../Home/Sections/About/About";
import CartModal from "../Home/Sections/CartModal";
import { useOpener } from "../../hooks/useOpener";
import { Toaster } from "react-hot-toast";
import Footer from "./Sections/Footer";

const Home = () => {
  const { openModal } = useOpener();

  return (
    <>
      <Toaster />
      {!openModal && (
        <div className={styles.shoppingCart}>
          <ShoppingCart />
        </div>
      )}

      <Header />
      <Products />
      <About />
      <Footer />
      {openModal && <CartModal />}
    </>
  );
};

export default Home;
