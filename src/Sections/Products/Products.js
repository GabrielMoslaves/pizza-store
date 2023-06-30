import React from "react";
import Card from "../../components/Card/Card";
import styles from "./styles.module.scss";

const Products = () => {
  return (
    <div className={styles.container}>
      <h1>Mais vendidas</h1>
      <Card />
    </div>
  );
};

export default Products;
