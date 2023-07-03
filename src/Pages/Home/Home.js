import React from "react";
import Header from "../../Sections/Header/Header";
import Products from "../../Sections/Products/Products";
import About from "../../Sections/About/About";
import styles from "./styles.module.scss";

const Home = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Products />
        <About />
      </div>
    </>
  );
};

export default Home;
