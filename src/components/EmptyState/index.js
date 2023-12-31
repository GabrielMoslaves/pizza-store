import React from "react";
import styles from "./styles..module.scss";

const EmptyState = () => {
  return (
    <div className={styles.container}>
      <h2>Sem produtos no carrinho</h2>
      <img width={200} src="/empty-cart.png" alt="carrinho-vazio" />
      <p>Adicione produtos e eles aparecerão aqui :)</p>
    </div>
  );
};

export default EmptyState;
