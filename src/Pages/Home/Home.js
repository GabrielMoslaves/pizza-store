import React from "react";
import Header from "../../Sections/Header/Header";
import Products from "../../Sections/Products/Products";
import About from "../../Sections/About/About";
import styles from "./styles.module.scss";
import ShoppingCart from "../../components/ShoppingCart";

const Home = () => {
  return (
    <>
      <div className={styles.shoppingCart}>
        <ShoppingCart />
      </div>
      <Header />

      <Products />

      <About />
    </>
  );
};

export default Home;
